import apiClient from "../api-client";
import {
  ApiResponse,
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
  RolePermissionsRequest,
} from "@/types/api";

// ============================================
// Role Management API (Admin Only)
// ============================================

export async function getAllRoles(): Promise<Role[]> {
  const response = await apiClient.get<ApiResponse<Role[]>>("/api/admin/roles");
  return response.data.data;
}

export async function getRoleById(id: number): Promise<Role> {
  const response = await apiClient.get<ApiResponse<Role>>(
    `/api/admin/roles/${id}`,
  );
  return response.data.data;
}

export async function createRole(data: CreateRoleRequest): Promise<Role> {
  const response = await apiClient.post<ApiResponse<Role>>(
    "/api/admin/roles",
    data,
  );
  return response.data.data;
}

export async function updateRole(
  id: number,
  data: UpdateRoleRequest,
): Promise<Role> {
  const response = await apiClient.put<ApiResponse<Role>>(
    `/api/admin/roles/${id}`,
    data,
  );
  return response.data.data;
}

export async function deleteRole(id: number): Promise<void> {
  await apiClient.delete(`/api/admin/roles/${id}`);
}

export async function updateRolePermissions(
  id: number,
  data: RolePermissionsRequest,
): Promise<Role> {
  const response = await apiClient.put<ApiResponse<Role>>(
    `/api/admin/roles/${id}/permissions`,
    data,
  );
  return response.data.data;
}
