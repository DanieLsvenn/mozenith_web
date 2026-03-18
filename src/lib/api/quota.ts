import apiClient from "../api-client";
import { ApiResponse, QuotaResponse, PackageType } from "@/types/api";

// ============================================
// Quota Management API
// ============================================

export async function getCurrentUserQuota(): Promise<QuotaResponse> {
  const response =
    await apiClient.get<ApiResponse<QuotaResponse>>("/api/quota");
  return response.data.data;
}

export async function consumeQuota(): Promise<QuotaResponse> {
  const response =
    await apiClient.post<ApiResponse<QuotaResponse>>("/api/quota/consume");
  return response.data.data;
}

export async function upgradeToPremium(): Promise<QuotaResponse> {
  const response =
    await apiClient.post<ApiResponse<QuotaResponse>>("/api/quota/upgrade");
  return response.data.data;
}

// ============================================
// User Package Management (Admin)
// ============================================

export async function updateUserPackage(
  userId: number,
  packageType: PackageType,
): Promise<QuotaResponse> {
  const response = await apiClient.put<ApiResponse<QuotaResponse>>(
    `/api/admin/users/${userId}/package`,
    { packageType },
  );
  return response.data.data;
}
