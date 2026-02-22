import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  logoutCurrentDevice,
  logoutAllDevices,
  forceLogoutUser,
} from "@/lib/api/sessions";
import { USERS_QUERY_KEY } from "./use-users";

export function useLogoutCurrentDevice() {
  return useMutation({
    mutationFn: logoutCurrentDevice,
  });
}

export function useLogoutAllDevices() {
  return useMutation({
    mutationFn: logoutAllDevices,
  });
}

export function useForceLogoutUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => forceLogoutUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
}
