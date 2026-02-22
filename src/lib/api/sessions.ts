import apiClient from "../api-client";
import { ApiResponse } from "@/types/api";

// ============================================
// Session Management API
// ============================================

export async function logoutCurrentDevice(): Promise<void> {
  await apiClient.post<ApiResponse<unknown>>("/api/session/logout");
}

export async function logoutAllDevices(): Promise<void> {
  await apiClient.post<ApiResponse<unknown>>("/api/session/logout-all");
}

export async function forceLogoutUser(userId: number): Promise<void> {
  await apiClient.post<ApiResponse<unknown>>(
    `/api/session/force-logout/${userId}`,
  );
}
