"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { User } from "@/types/api";
import {
  getStoredUser,
  isAuthenticated as checkCookieAuth,
  clearAuthCookies,
  setAuthCookies,
} from "@/lib/api-client";
import {
  getCurrentUser,
  login as apiLogin,
  logout as apiLogout,
} from "@/lib/api/auth";
import { ROLES, RoleType } from "@/lib/constants";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  hasRole: (role: RoleType | RoleType[]) => boolean;
  hasAnyRole: (...roles: RoleType[]) => boolean;
  isAdmin: boolean;
  isManager: boolean;
  isStaff: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize with stored user for immediate render
    if (typeof window !== "undefined") {
      return getStoredUser();
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const hasToken = checkCookieAuth();
    const storedUser = getStoredUser();

    if (!hasToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    // If we have a stored user, use it immediately
    if (storedUser) {
      // Ensure role is set (may be missing from cookie)
      if (!storedUser.role) {
        storedUser.role = "ADMIN";
      }
      setUser(storedUser);
      setIsLoading(false);

      // Optionally refresh user data in background (don't block UI)
      try {
        const freshUser = await getCurrentUser();
        // WORKAROUND: Infer ADMIN role if not provided by API
        if (freshUser && !freshUser.role) {
          freshUser.role = "ADMIN";
        }
        setUser(freshUser);
        const accessToken =
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("mozenith_access_token="))
            ?.split("=")[1] || "";
        const refreshToken =
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("mozenith_refresh_token="))
            ?.split("=")[1] || "";
        if (accessToken && refreshToken) {
          setAuthCookies(accessToken, refreshToken, freshUser);
        }
      } catch (fetchError) {
        console.warn("Failed to fetch fresh user data:", fetchError);
        // Keep using stored user
      }
      return;
    }

    // No stored user but have token - try to fetch
    try {
      const freshUser = await getCurrentUser();

      // WORKAROUND: Infer ADMIN role if not provided by API
      if (freshUser && !freshUser.role) {
        freshUser.role = "ADMIN";
      }

      setUser(freshUser);
      const accessToken =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("mozenith_access_token="))
          ?.split("=")[1] || "";
      const refreshToken =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("mozenith_refresh_token="))
          ?.split("=")[1] || "";
      if (accessToken && refreshToken) {
        setAuthCookies(accessToken, refreshToken, freshUser);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      clearAuthCookies();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (username: string, password: string) => {
    // Login returns tokens only, no user
    await apiLogin({ username, password });
    // Fetch user profile after successful login
    const fetchedUser = await getCurrentUser();
    console.log("Fetched user after login:", fetchedUser);

    // WORKAROUND: The /api/admin/users/me endpoint doesn't return role
    // Infer ADMIN role if user can access admin endpoint OR username is "admin"
    // TODO: Ask backend to include role in /me response
    if (fetchedUser && !fetchedUser.role) {
      // If user successfully called admin endpoint, they must be admin
      fetchedUser.role = "ADMIN";
      console.log("Inferred role as ADMIN (user can access admin endpoints)");
    }

    console.log("User role:", fetchedUser?.role);
    setUser(fetchedUser);
    // Store user in cookie for persistence
    const accessToken =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("mozenith_access_token="))
        ?.split("=")[1] || "";
    const refreshToken =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("mozenith_refresh_token="))
        ?.split("=")[1] || "";
    if (accessToken && refreshToken) {
      setAuthCookies(accessToken, refreshToken, fetchedUser);
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const refreshUser = async () => {
    if (!checkCookieAuth()) return;
    try {
      const freshUser = await getCurrentUser();
      setUser(freshUser);
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  const hasRole = (role: RoleType | RoleType[]): boolean => {
    if (!user?.role) return false;
    const rolesToCheck = Array.isArray(role) ? role : [role];
    return rolesToCheck.includes(user.role as RoleType);
  };

  const hasAnyRole = (...roles: RoleType[]): boolean => {
    if (!user?.role) return false;
    return roles.includes(user.role as RoleType);
  };

  const isAdmin = hasRole(ROLES.ADMIN);
  const isManager = hasRole(ROLES.MANAGER);
  const isStaff = hasRole(ROLES.STAFF);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
        hasRole,
        hasAnyRole,
        isAdmin,
        isManager,
        isStaff,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
