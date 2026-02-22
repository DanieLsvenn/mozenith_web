import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, AUTH_COOKIES } from "./constants";
import { ApiResponse, TokenRefreshResponse } from "@/types/api";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Track if we're currently refreshing
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get(AUTH_COOKIES.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(apiClient(originalRequest));
            },
            reject: (err: Error) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get(AUTH_COOKIES.REFRESH_TOKEN);

      if (!refreshToken) {
        // No refresh token, redirect to login
        isRefreshing = false;
        clearAuthCookies();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      try {
        const response = await axios.post<ApiResponse<TokenRefreshResponse>>(
          `${API_BASE_URL}/api/refresh-token`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } },
        );

        const { token: accessToken, refreshToken: newRefreshToken } =
          response.data.data;

        // Update tokens in cookies
        const cookieOptions = {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict" as const,
        };
        Cookies.set(AUTH_COOKIES.ACCESS_TOKEN, accessToken, cookieOptions);
        Cookies.set(AUTH_COOKIES.REFRESH_TOKEN, newRefreshToken, cookieOptions);

        // Update authorization header
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        processQueue(null, accessToken);
        isRefreshing = false;

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        isRefreshing = false;
        clearAuthCookies();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export function clearAuthCookies() {
  Cookies.remove(AUTH_COOKIES.ACCESS_TOKEN);
  Cookies.remove(AUTH_COOKIES.REFRESH_TOKEN);
  Cookies.remove(AUTH_COOKIES.USER);
}

export function setAuthCookies(
  accessToken: string,
  refreshToken: string,
  user?: object,
) {
  const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };
  Cookies.set(AUTH_COOKIES.ACCESS_TOKEN, accessToken, cookieOptions);
  Cookies.set(AUTH_COOKIES.REFRESH_TOKEN, refreshToken, cookieOptions);
  if (user) {
    Cookies.set(AUTH_COOKIES.USER, JSON.stringify(user), cookieOptions);
  }
}

export function getStoredUser() {
  const userStr = Cookies.get(AUTH_COOKIES.USER);
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
}

export function isAuthenticated(): boolean {
  return !!Cookies.get(AUTH_COOKIES.ACCESS_TOKEN);
}

export default apiClient;
