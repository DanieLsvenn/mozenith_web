import apiClient from "../api-client";
import { ApiResponse, Permission, PermissionRequest } from "@/types/api";

// ============================================
// Permission Management API (Admin Only)
// ============================================

export async function getAllPermissions(): Promise<Permission[]> {
  const response = await apiClient.get<ApiResponse<Permission[]>>(
    "/api/admin/permissions",
  );
  return response.data.data;
}

export async function updatePermission(
  id: number,
  data: PermissionRequest,
): Promise<Permission> {
  const response = await apiClient.put<ApiResponse<Permission>>(
    `/api/admin/permissions/${id}`,
    data,
  );
  return response.data.data;
}
