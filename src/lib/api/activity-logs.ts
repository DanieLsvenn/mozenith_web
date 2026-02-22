import apiClient from "../api-client";
import {
  ApiResponse,
  UserActivityLog,
  PaginatedActivityLogs,
  PaginationParams,
  DateRangeParams,
  UserActivityLogExportRequest,
} from "@/types/api";
import { PAGINATION } from "../constants";

// ============================================
// User Activity Log Management API
// ============================================

export async function getAllActivityLogs(
  params: PaginationParams = {},
): Promise<PaginatedActivityLogs> {
  const { page = PAGINATION.DEFAULT_PAGE, size = PAGINATION.DEFAULT_SIZE } =
    params;
  const response = await apiClient.get<ApiResponse<PaginatedActivityLogs>>(
    "/api/user-activity-logs",
    {
      params: { page, size },
    },
  );
  return response.data.data;
}

export async function getActivityLogById(id: number): Promise<UserActivityLog> {
  const response = await apiClient.get<ApiResponse<UserActivityLog>>(
    `/api/user-activity-logs/${id}`,
  );
  return response.data.data;
}

export async function deleteActivityLog(id: number): Promise<void> {
  await apiClient.delete(`/api/user-activity-logs/${id}`);
}

export async function getActivityLogsByUserId(
  userId: number,
  params: PaginationParams = {},
): Promise<PaginatedActivityLogs> {
  const { page = PAGINATION.DEFAULT_PAGE, size = PAGINATION.DEFAULT_SIZE } =
    params;
  const response = await apiClient.get<ApiResponse<PaginatedActivityLogs>>(
    `/api/user-activity-logs/user/${userId}`,
    {
      params: { page, size },
    },
  );
  return response.data.data;
}

export async function getActivityLogsByActionType(
  actionType: string,
  params: PaginationParams = {},
): Promise<PaginatedActivityLogs> {
  const { page = PAGINATION.DEFAULT_PAGE, size = PAGINATION.DEFAULT_SIZE } =
    params;
  const response = await apiClient.get<ApiResponse<PaginatedActivityLogs>>(
    `/api/user-activity-logs/type/${actionType}`,
    {
      params: { page, size },
    },
  );
  return response.data.data;
}

export async function getActivityLogsByDateRange(
  params: DateRangeParams,
): Promise<PaginatedActivityLogs> {
  const {
    startDate,
    endDate,
    page = PAGINATION.DEFAULT_PAGE,
    size = PAGINATION.DEFAULT_SIZE,
  } = params;
  const response = await apiClient.get<ApiResponse<PaginatedActivityLogs>>(
    "/api/user-activity-logs/date-range",
    {
      params: { startDate, endDate, page, size },
    },
  );
  return response.data.data;
}

export async function getMyLoginHistory(
  params: PaginationParams = {},
): Promise<PaginatedActivityLogs> {
  const { page = PAGINATION.DEFAULT_PAGE, size = PAGINATION.DEFAULT_SIZE } =
    params;
  const response = await apiClient.get<ApiResponse<PaginatedActivityLogs>>(
    "/api/user-activity-logs/my-login-history",
    {
      params: { page, size },
    },
  );
  return response.data.data;
}

export async function exportActivityLogs(
  data: UserActivityLogExportRequest,
  params: PaginationParams = {},
): Promise<Blob> {
  const { page = PAGINATION.DEFAULT_PAGE, size = PAGINATION.DEFAULT_SIZE } =
    params;
  const response = await apiClient.post(
    "/api/user-activity-logs/export",
    data,
    {
      params: { page, size },
      responseType: "blob",
    },
  );
  return response.data;
}
