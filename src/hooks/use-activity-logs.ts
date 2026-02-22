import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllActivityLogs,
  getActivityLogById,
  deleteActivityLog,
  getActivityLogsByUserId,
  getActivityLogsByActionType,
  getActivityLogsByDateRange,
  getMyLoginHistory,
  exportActivityLogs,
} from "@/lib/api/activity-logs";
import {
  PaginationParams,
  DateRangeParams,
  UserActivityLogExportRequest,
} from "@/types/api";

export const ACTIVITY_LOGS_QUERY_KEY = "activityLogs";
export const MY_LOGIN_HISTORY_QUERY_KEY = "myLoginHistory";

export function useActivityLogs(params: PaginationParams = {}) {
  return useQuery({
    queryKey: [ACTIVITY_LOGS_QUERY_KEY, "all", params],
    queryFn: () => getAllActivityLogs(params),
  });
}

export function useActivityLog(id: number) {
  return useQuery({
    queryKey: [ACTIVITY_LOGS_QUERY_KEY, id],
    queryFn: () => getActivityLogById(id),
    enabled: !!id,
  });
}

export function useActivityLogsByUser(
  userId: number,
  params: PaginationParams = {},
) {
  return useQuery({
    queryKey: [ACTIVITY_LOGS_QUERY_KEY, "user", userId, params],
    queryFn: () => getActivityLogsByUserId(userId, params),
    enabled: !!userId,
  });
}

export function useActivityLogsByActionType(
  actionType: string,
  params: PaginationParams = {},
) {
  return useQuery({
    queryKey: [ACTIVITY_LOGS_QUERY_KEY, "type", actionType, params],
    queryFn: () => getActivityLogsByActionType(actionType, params),
    enabled: !!actionType,
  });
}

export function useActivityLogsByDateRange(params: DateRangeParams | null) {
  return useQuery({
    queryKey: [ACTIVITY_LOGS_QUERY_KEY, "dateRange", params],
    queryFn: () => getActivityLogsByDateRange(params!),
    enabled: !!params?.startDate && !!params?.endDate,
  });
}

export function useMyLoginHistory(params: PaginationParams = {}) {
  return useQuery({
    queryKey: [MY_LOGIN_HISTORY_QUERY_KEY, params],
    queryFn: () => getMyLoginHistory(params),
  });
}

export function useDeleteActivityLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteActivityLog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ACTIVITY_LOGS_QUERY_KEY] });
    },
  });
}

export function useExportActivityLogs() {
  return useMutation({
    mutationFn: ({
      data,
      params,
    }: {
      data: UserActivityLogExportRequest;
      params?: PaginationParams;
    }) => exportActivityLogs(data, params),
  });
}
