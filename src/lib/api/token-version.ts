import apiClient from "../api-client";
import { ApiResponse, BaseActionRequest, TokenVersion } from "@/types/api";

// ============================================
// Token Version Management API
// ============================================

export async function getCurrentUserTokenVersion(): Promise<TokenVersion> {
  const response = await apiClient.get<ApiResponse<TokenVersion>>(
    "/api/token-version/current",
  );
  return response.data.data;
}

export async function getUserTokenVersionById(
  userId: number,
): Promise<TokenVersion> {
  const response = await apiClient.get<ApiResponse<TokenVersion>>(
    `/api/token-version/user/${userId}`,
  );
  return response.data.data;
}

export async function invalidateAllCurrentUserTokens(
  data: BaseActionRequest = {},
): Promise<void> {
  await apiClient.post<ApiResponse<unknown>>(
    "/api/token-version/invalidate-all",
    data,
  );
}

export async function invalidateUserTokensByUserId(
  userId: number,
  data: BaseActionRequest = {},
): Promise<void> {
  await apiClient.post<ApiResponse<unknown>>(
    `/api/token-version/invalidate-user/${userId}`,
    data,
  );
}
