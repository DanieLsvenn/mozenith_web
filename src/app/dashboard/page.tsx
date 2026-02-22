"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { TopBar } from "@/components/dashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  EmptyState,
} from "@/components/ui";
import { ROLES } from "@/lib/constants";
import { useUsers } from "@/hooks/use-users";
import { useActivityLogs } from "@/hooks/use-activity-logs";
import { formatDate } from "@/lib/utils";
import {
  Users,
  Shield,
  Activity,
  Clock,
  CheckCircle2,
  User as UserIcon,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, hasRole } = useAuth();
  const isAdmin = hasRole(ROLES.ADMIN);

  // Pagination state for users
  const [usersPage, setUsersPage] = useState(0);
  const [usersPageSize, setUsersPageSize] = useState(5);

  // Pagination state for activity logs
  const [logsPage, setLogsPage] = useState(0);
  const [logsPageSize, setLogsPageSize] = useState(5);

  // Fetch users (admin only)
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers(
    isAdmin ? { page: usersPage, size: usersPageSize } : { page: 0, size: 0 },
  );

  // Fetch activity logs (admin only)
  const {
    data: logsData,
    isLoading: logsLoading,
    error: logsError,
  } = useActivityLogs(
    isAdmin ? { page: logsPage, size: logsPageSize } : { page: 0, size: 0 },
  );

  const stats = [
    {
      label: "Total Users",
      value: usersData?.totalElements?.toString() || "—",
      change: `${usersData?.totalPages || 0} pages`,
      icon: Users,
      href: "/dashboard/users",
      adminOnly: true,
    },
    {
      label: "Active Roles",
      value: "3",
      change: "ADMIN, MANAGER, STAFF",
      icon: Shield,
      href: "/dashboard/roles",
      adminOnly: true,
    },
    {
      label: "Total Activity",
      value: logsData?.totalElements?.toString() || "—",
      change: `${logsData?.totalPages || 0} pages`,
      icon: Activity,
      href: "/dashboard/activity-logs",
      adminOnly: true,
    },
    {
      label: "System Status",
      value: "Healthy",
      change: "All systems operational",
      icon: CheckCircle2,
      href: "#",
      adminOnly: false,
    },
  ];

  const filteredStats = stats.filter((stat) => !stat.adminOnly || isAdmin);

  return (
    <>
      <TopBar
        title="Dashboard"
        description="Welcome back to Mozenith AI Control Platform"
      />
      <div className="p-6">
        {/* Welcome section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#3D3D3D]">
            Welcome back, {user?.fullName || user?.username}!
          </h2>
          <p className="mt-1 text-[#666666]">
            Here's an overview of your AI control platform.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredStats.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#666666]">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-2xl font-bold text-[#3D3D3D]">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-[#666666]">
                        {stat.change}
                      </p>
                    </div>
                    <div className="rounded-lg bg-[#99E7F1]/30 p-3">
                      <stat.icon className="h-6 w-6 text-[#0054C5]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Admin-only sections: Users List and Activity Logs */}
        {isAdmin && (
          <div className="space-y-6">
            {/* All Users Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  All Users
                </CardTitle>
                <Link
                  href="/dashboard/users"
                  className="text-sm font-medium text-[#0054C5] hover:text-[#003D91]"
                >
                  View all →
                </Link>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Spinner size="lg" />
                  </div>
                ) : usersError ? (
                  <div className="py-8 text-center text-sm text-red-500">
                    Failed to load users
                  </div>
                ) : !usersData?.content?.length ? (
                  <EmptyState
                    icon={<Users className="h-12 w-12" />}
                    title="No users found"
                    description="No users have been registered yet."
                  />
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {usersData.content.map((u) => (
                            <TableRow key={u.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#99E7F1] text-sm font-medium text-[#0054C5]">
                                    {u.fullName?.charAt(0) ||
                                      u.username?.charAt(0) ||
                                      "?"}
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
                              <TableCell>
                                <div className="flex items-center gap-2 text-[#666666]">
                                  <Mail className="h-4 w-4" />
                                  {u.email}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {u.roles?.map((role) => (
                                    <Badge
                                      key={role.id}
                                      variant={
                                        role.name === "ADMIN"
                                          ? "destructive"
                                          : role.name === "MANAGER"
                                            ? "warning"
                                            : "success"
                                      }
                                    >
                                      {role.name}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    u.status === "ACTIVE"
                                      ? "success"
                                      : "secondary"
                                  }
                                >
                                  {u.status || "ACTIVE"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-[#666666]">
                        Showing {usersData.content.length} of{" "}
                        {usersData.totalElements} users
                      </p>
                      <Pagination
                        currentPage={usersPage}
                        totalPages={usersData.totalPages}
                        totalElements={usersData.totalElements}
                        pageSize={usersPageSize}
                        onPageChange={setUsersPage}
                        onPageSizeChange={(size) => {
                          setUsersPageSize(size);
                          setUsersPage(0);
                        }}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Activity Logs Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity Logs
                </CardTitle>
                <Link
                  href="/dashboard/activity-logs"
                  className="text-sm font-medium text-[#0054C5] hover:text-[#003D91]"
                >
                  View all →
                </Link>
              </CardHeader>
              <CardContent>
                {logsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Spinner size="lg" />
                  </div>
                ) : logsError ? (
                  <div className="py-8 text-center text-sm text-red-500">
                    Failed to load activity logs
                  </div>
                ) : !logsData?.content?.length ? (
                  <EmptyState
                    icon={<Activity className="h-12 w-12" />}
                    title="No activity logs"
                    description="No activity has been recorded yet."
                  />
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {logsData.content.map((log) => (
                            <TableRow key={log.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <UserIcon className="h-4 w-4 text-[#666666]" />
                                  <span className="font-medium text-[#3D3D3D]">
                                    {log.fullName || `User #${log.userId}`}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    log.activityType === "LOGIN" ||
                                    log.activityType === "LOGIN_ATTEMPT"
                                      ? "success"
                                      : log.activityType === "LOGOUT"
                                        ? "secondary"
                                        : log.activityType === "REGISTRATION"
                                          ? "default"
                                          : "warning"
                                  }
                                >
                                  {log.activityType}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 text-[#666666]">
                                  <MapPin className="h-4 w-4" />
                                  {log.ipAddress || "—"}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 text-[#666666]">
                                  <Clock className="h-4 w-4" />
                                  {formatDate(log.timestamp)}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-[#666666]">
                        Showing {logsData.content.length} of{" "}
                        {logsData.totalElements} logs
                      </p>
                      <Pagination
                        currentPage={logsPage}
                        totalPages={logsData.totalPages}
                        totalElements={logsData.totalElements}
                        pageSize={logsPageSize}
                        onPageChange={setLogsPage}
                        onPageSizeChange={(size) => {
                          setLogsPageSize(size);
                          setLogsPage(0);
                        }}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Non-admin: System Status */}
        {!isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#52C41A]" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-[#52C41A]/30 bg-[#52C41A]/10 p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#52C41A]" />
                    <span className="font-medium text-[#3D3D3D]">
                      All systems operational
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#666666]">
                  The Mozenith AI platform is running smoothly. All services are
                  available and performing within expected parameters.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
