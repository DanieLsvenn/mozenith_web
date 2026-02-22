import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllPermissions, updatePermission } from "@/lib/api/permissions";
import { PermissionRequest } from "@/types/api";

export const PERMISSIONS_QUERY_KEY = "permissions";

export function usePermissions() {
  return useQuery({
    queryKey: [PERMISSIONS_QUERY_KEY],
    queryFn: getAllPermissions,
  });
}

export function useUpdatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PermissionRequest }) =>
      updatePermission(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PERMISSIONS_QUERY_KEY] });
    },
  });
}
