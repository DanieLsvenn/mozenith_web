import { useQuery } from "@tanstack/react-query";
import { getAllFeedback } from "@/lib/api/feedback";
import { PaginationParams } from "@/types/api";

export const FEEDBACK_QUERY_KEY = "feedback";

export function useFeedback(params: PaginationParams = {}) {
  return useQuery({
    queryKey: [FEEDBACK_QUERY_KEY, params],
    queryFn: () => getAllFeedback(params),
  });
}
