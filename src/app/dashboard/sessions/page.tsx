"use client";

import { useState } from "react";
import { TopBar } from "@/components/dashboard";
import { useAuth } from "@/contexts/auth-context";
import {
  useLogoutCurrentDevice,
  useLogoutAllDevices,
  useForceLogoutUser,
} from "@/hooks/use-sessions";
import { useUsers } from "@/hooks/use-users";
import { ROLES, PAGINATION } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Alert,
  ConfirmModal,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  LoadingState,
  EmptyState,
} from "@/components/ui";
import {
  MonitorSmartphone,
  LogOut,
  Power,
  AlertTriangle,
  Users,
  Shield,
} from "lucide-react";

export default function SessionsPage() {
  const { user, hasRole, logout } = useAuth();
  const isAdmin = hasRole(ROLES.ADMIN);

  const logoutCurrentDevice = useLogoutCurrentDevice();
  const logoutAllDevices = useLogoutAllDevices();
  const forceLogoutUser = useForceLogoutUser();

  // Only fetch users if admin
  const { data: usersData, isLoading: usersLoading } = useUsers(
    isAdmin ? { page: 0, size: 100 } : { page: 0, size: 0 },
  );

  // Modal states
  const [isLogoutAllOpen, setIsLogoutAllOpen] = useState(false);
  const [isForceLogoutOpen, setIsForceLogoutOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUsername, setSelectedUsername] = useState<string>("");

  const handleLogoutCurrentDevice = async () => {
    try {
      await logoutCurrentDevice.mutateAsync();
      logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      await logoutAllDevices.mutateAsync();
      setIsLogoutAllOpen(false);
      logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to logout from all devices:", error);
    }
  };

  const handleForceLogout = async () => {
    if (!selectedUserId) return;
    try {
      await forceLogoutUser.mutateAsync(selectedUserId);
      setIsForceLogoutOpen(false);
      setSelectedUserId(null);
      setSelectedUsername("");
    } catch (error) {
      console.error("Failed to force logout user:", error);
    }
  };

  const openForceLogoutModal = (userId: number, username: string) => {
    setSelectedUserId(userId);
    setSelectedUsername(username);
    setIsForceLogoutOpen(true);
  };

  return (
    <>
      <TopBar
        title="Session Management"
        description="Manage your sessions and device access"
      />
      <div className="p-6 space-y-6">
        {/* Current Session Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MonitorSmartphone className="h-5 w-5" />
              Your Session
            </CardTitle>
            <CardDescription>
              Manage your current session and device access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-[#EEEEEE] p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#52C41A]/20">
                  <MonitorSmartphone className="h-6 w-6 text-[#52C41A]" />
                </div>
                <div>
                  <p className="font-medium text-[#3D3D3D]">Current Device</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">Active</Badge>
                    <span className="text-sm text-[#666666]">
                      Logged in as {user?.username}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogoutCurrentDevice}
                isLoading={logoutCurrentDevice.isPending}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="destructive"
                onClick={() => setIsLogoutAllOpen(true)}
                className="flex-1"
              >
                <Power className="h-4 w-4" />
                Logout from All Devices
              </Button>
            </div>

            <Alert variant="warning">
              <p>
                Logging out from all devices will invalidate all your active
                sessions. You will need to log in again on each device.
              </p>
            </Alert>
          </CardContent>
        </Card>

        {/* Admin: Force Logout Users */}
        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Force Logout Users
                <Badge variant="destructive">Admin Only</Badge>
              </CardTitle>
              <CardDescription>
                Force logout users from all their devices. Use with caution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <LoadingState message="Loading users..." />
              ) : !usersData?.content?.length ? (
                <EmptyState
                  icon={<Users className="h-8 w-8 text-[#666666]" />}
                  title="No users found"
                  description="There are no users to manage."
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersData.content.map((u) => (
                      <TableRow key={u.userId}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#99E7F1] text-sm font-medium text-[#0054C5]">
                              {u.fullName?.charAt(0) ||
                                u.username?.charAt(0) ||
                                "U"}
                            </div>
                            <div>
                              <p className="font-medium text-[#3D3D3D]">
                                {u.fullName || u.username}
                              </p>
                              <p className="text-xs text-[#666666]">
                                @{u.username}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {u.role ? (
                              <Badge
                                variant={
                                  u.role === ROLES.ADMIN
                                    ? "destructive"
                                    : u.role === ROLES.MANAGER
                                      ? "warning"
                                      : "success"
                                }
                                className="text-xs"
                              >
                                {u.role}
                              </Badge>
                            ) : (
                              "—"
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                openForceLogoutModal(u.userId, u.username)
                              }
                              disabled={u.userId === user?.userId}
                              className="text-red-500 hover:text-red-600 disabled:opacity-50"
                            >
                              <Power className="h-4 w-4" />
                              Force Logout
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Logout All Devices Modal */}
      <ConfirmModal
        isOpen={isLogoutAllOpen}
        onClose={() => setIsLogoutAllOpen(false)}
        onConfirm={handleLogoutAllDevices}
        title="Logout from All Devices"
        description="This will log you out from all devices, including this one. You will need to log in again. Are you sure you want to continue?"
        confirmText="Logout All"
        variant="destructive"
        isLoading={logoutAllDevices.isPending}
      />

      {/* Force Logout Modal */}
      <ConfirmModal
        isOpen={isForceLogoutOpen}
        onClose={() => {
          setIsForceLogoutOpen(false);
          setSelectedUserId(null);
          setSelectedUsername("");
        }}
        onConfirm={handleForceLogout}
        title="Force Logout User"
        description={`Are you sure you want to force logout "${selectedUsername}" from all their devices? This action will immediately terminate all their active sessions.`}
        confirmText="Force Logout"
        variant="destructive"
        isLoading={forceLogoutUser.isPending}
      />
    </>
  );
}
