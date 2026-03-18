import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUserQuota, updateUserPackage } from "@/lib/api/quota";
import { PackageType } from "@/types/api";
import { USERS_QUERY_KEY } from "./use-users";

export const QUOTA_QUERY_KEY = "quota";

export function useCurrentUserQuota() {
  return useQuery({
    queryKey: [QUOTA_QUERY_KEY],
    queryFn: getCurrentUserQuota,
  });
}

export function useUpdateUserPackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      packageType,
    }: {
      userId: number;
      packageType: PackageType;
    }) => updateUserPackage(userId, packageType),
    onSuccess: () => {
      // Invalidate users query to refresh the list
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
}
