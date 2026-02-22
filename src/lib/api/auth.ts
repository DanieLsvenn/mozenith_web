import apiClient, { setAuthCookies, clearAuthCookies } from "../api-client";
import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  UserRegistrationRequest,
  GoogleLoginRequest,
  FacebookLoginRequest,
  EmailRequest,
  OtpRequest,
  ResetPasswordRequestWithOtp,
  User,
} from "@/types/api";

// ============================================
// Authentication API
// ============================================

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    "/api/login",
    data,
  );
  const loginData = response.data.data;
  setAuthCookies(loginData.token, loginData.refreshToken);
  return loginData;
}

export async function register(
  data: UserRegistrationRequest,
): Promise<ApiResponse<unknown>> {
  const response = await apiClient.post<ApiResponse<unknown>>(
    "/api/register",
    data,
  );
  return response.data;
}

export async function refreshToken(
  data: TokenRefreshRequest,
): Promise<TokenRefreshResponse> {
  const response = await apiClient.post<ApiResponse<TokenRefreshResponse>>(
    "/api/refresh-token",
    data,
  );
  const tokenData = response.data.data;
  setAuthCookies(tokenData.token, tokenData.refreshToken);
  return tokenData;
}

export async function googleLogin(
  data: GoogleLoginRequest,
): Promise<LoginResponse> {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    "/api/google-login",
    data,
  );
  const loginData = response.data.data;
  setAuthCookies(loginData.token, loginData.refreshToken);
  return loginData;
}

export async function facebookLogin(
  data: FacebookLoginRequest,
): Promise<LoginResponse> {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    "/api/facebook-login",
    data,
  );
  const loginData = response.data.data;
  setAuthCookies(loginData.token, loginData.refreshToken);
  return loginData;
}

export async function oauth2Success(): Promise<LoginResponse> {
  const response = await apiClient.get<ApiResponse<LoginResponse>>(
    "/api/oauth2/success",
  );
  const loginData = response.data.data;
  setAuthCookies(loginData.token, loginData.refreshToken);
  return loginData;
}

export function logout(): void {
  clearAuthCookies();
}

// ============================================
// Email OTP API
// ============================================

export async function sendVerificationOtp(
  data: EmailRequest,
): Promise<ApiResponse<unknown>> {
  const response = await apiClient.post<ApiResponse<unknown>>(
    "/api/email/send-verification",
    data,
  );
  return response.data;
}

export async function verifyEmailOtp(
  data: OtpRequest,
): Promise<ApiResponse<unknown>> {
  const response = await apiClient.post<ApiResponse<unknown>>(
    "/api/email/verify",
    data,
  );
  return response.data;
}

export async function sendForgotPasswordOtp(
  data: EmailRequest,
): Promise<ApiResponse<unknown>> {
  const response = await apiClient.post<ApiResponse<unknown>>(
    "/api/email/forgot-password",
    data,
  );
  return response.data;
}

export async function resetPasswordWithOtp(
  data: ResetPasswordRequestWithOtp,
): Promise<ApiResponse<unknown>> {
  const response = await apiClient.post<ApiResponse<unknown>>(
    "/api/email/reset-password",
    data,
  );
  return response.data;
}

export async function resendOtp(
  data: EmailRequest,
): Promise<ApiResponse<unknown>> {
  const response = await apiClient.post<ApiResponse<unknown>>(
    "/api/email/resend",
    data,
  );
  return response.data;
}

// ============================================
// Current User API
// ============================================

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>(
    "/api/admin/users/me",
  );
  return response.data.data;
}
