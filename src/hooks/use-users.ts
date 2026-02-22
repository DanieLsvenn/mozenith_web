import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getCurrentUserProfile } from "@/lib/api/users";
import { PaginationParams } from "@/types/api";

export const USERS_QUERY_KEY = "users";
export const CURRENT_USER_QUERY_KEY = "currentUser";

export function useUsers(params: PaginationParams = {}) {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, params],
    queryFn: () => getAllUsers(params),
  });
}

export function useCurrentUserProfile() {
  return useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: getCurrentUserProfile,
  });
}
