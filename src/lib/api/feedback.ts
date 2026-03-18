import apiClient from "../api-client";
import { ApiResponse, PaginatedFeedback, PaginationParams } from "@/types/api";
import { PAGINATION } from "../constants";

// ============================================
// Feedback / Reviews API
// ============================================

export async function getAllFeedback(
  params: PaginationParams = {},
): Promise<PaginatedFeedback> {
  const { page = PAGINATION.DEFAULT_PAGE, size = PAGINATION.DEFAULT_SIZE } =
    params;
  const response = await apiClient.get<ApiResponse<PaginatedFeedback>>(
    "/api/feedback/all",
    {
      params: { page, size },
    },
  );
  return response.data.data;
}
