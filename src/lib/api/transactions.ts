import apiClient from "../api-client";
import {
  ApiResponse,
  PaginatedTransactions,
  TransactionQueryParams,
  PaymentTransaction,
} from "@/types/api";
import { PAGINATION } from "../constants";

// ============================================
// Transaction Management API (Admin Only)
// ============================================

export async function searchTransactions(
  params: TransactionQueryParams = {},
): Promise<PaginatedTransactions> {
  const {
    page = PAGINATION.DEFAULT_PAGE,
    size = PAGINATION.DEFAULT_SIZE,
    id,
    userId,
    txnRef,
    status,
    startDate,
    endDate,
    sortBy,
    sortDir,
  } = params;

  const queryParams: Record<string, string | number | undefined> = {
    page,
    size,
  };

  if (id !== undefined) queryParams.id = id;
  if (userId !== undefined) queryParams.userId = userId;
  if (txnRef) queryParams.txnRef = txnRef;
  if (status) queryParams.status = status;
  if (startDate) queryParams.startDate = startDate;
  if (endDate) queryParams.endDate = endDate;
  if (sortBy) queryParams.sortBy = sortBy;
  if (sortDir) queryParams.sortDir = sortDir;

  const response = await apiClient.get<ApiResponse<PaginatedTransactions>>(
    "/api/transactions",
    { params: queryParams },
  );
  return response.data.data;
}

export async function getTransactionById(
  id: number,
): Promise<PaymentTransaction> {
  const response = await apiClient.get<ApiResponse<PaginatedTransactions>>(
    "/api/transactions",
    { params: { id } },
  );
  // The API returns paginated results, so we extract the first item
  const data = response.data.data;
  if (data.content.length === 0) {
    throw new Error("Transaction not found");
  }
  return data.content[0];
}

// ============================================
// Transaction Statistics
// ============================================

export async function getTransactionStats(): Promise<{
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  pendingTransactions: number;
  cancelledTransactions: number;
  totalRevenue: number;
}> {
  const response = await apiClient.get<
    ApiResponse<{
      totalTransactions: number;
      successfulTransactions: number;
      failedTransactions: number;
      pendingTransactions: number;
      cancelledTransactions: number;
      totalRevenue: number;
    }>
  >("/api/transactions/stats");
  return response.data.data;
}
