import { useQuery } from "@tanstack/react-query";
import {
  searchTransactions,
  getTransactionStats,
} from "@/lib/api/transactions";
import { TransactionQueryParams } from "@/types/api";

export const TRANSACTIONS_QUERY_KEY = "transactions";
export const TRANSACTION_STATS_QUERY_KEY = "transactionStats";

export function useTransactions(params: TransactionQueryParams = {}) {
  return useQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY, params],
    queryFn: () => searchTransactions(params),
  });
}

export function useTransactionStats() {
  return useQuery({
    queryKey: [TRANSACTION_STATS_QUERY_KEY],
    queryFn: getTransactionStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
