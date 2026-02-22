"use client";

import { TopBar } from "@/components/dashboard";
import { useAuth } from "@/contexts/auth-context";
import { useMyLoginHistory } from "@/hooks/use-activity-logs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
  LoadingState,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  EmptyState,
} from "@/components/ui";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Clock,
  Globe,
  Monitor,
} from "lucide-react";
import { formatDate, formatDateOnly } from "@/lib/utils";
import { ROLES } from "@/lib/constants";

export default function ProfilePage() {
  const { user, hasRole } = useAuth();
  const { data: loginHistory, isLoading: historyLoading } = useMyLoginHistory({
    page: 0,
    size: 10,
  });

  const getRoleBadgeVariant = (roleName: string) => {
    switch (roleName) {
      case ROLES.ADMIN:
        return "destructive";
      case ROLES.MANAGER:
        return "warning";
      case ROLES.STAFF:
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <TopBar title="Profile" description="View your account information" />
      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              {/* Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#99E7F1] text-3xl font-bold text-[#0054C5]">
                {user?.fullName?.charAt(0) || user?.username?.charAt(0) || "U"}
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-[#3D3D3D]">
                  {user?.fullName || user?.username}
                </h2>
                <p className="text-[#666666]">@{user?.username}</p>

                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {user?.roles?.map((role) => (
                    <Badge
                      key={role.id}
                      variant={getRoleBadgeVariant(role.name)}
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      {role.name}
                    </Badge>
                  ))}
                  {user?.emailVerified && (
                    <Badge variant="success">Email Verified</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border border-[#EEEEEE] p-4">
                <Mail className="h-5 w-5 text-[#666666]" />
                <div>
                  <p className="text-sm text-[#666666]">Email</p>
                  <p className="font-medium text-[#3D3D3D]">
                    {user?.email || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-[#EEEEEE] p-4">
                <Phone className="h-5 w-5 text-[#666666]" />
                <div>
                  <p className="text-sm text-[#666666]">Phone</p>
                  <p className="font-medium text-[#3D3D3D]">
                    {user?.phone || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-[#EEEEEE] p-4">
                <Calendar className="h-5 w-5 text-[#666666]" />
                <div>
                  <p className="text-sm text-[#666666]">Date of Birth</p>
                  <p className="font-medium text-[#3D3D3D]">
                    {user?.dateOfBirth ? formatDateOnly(user.dateOfBirth) : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-[#EEEEEE] p-4">
                <User className="h-5 w-5 text-[#666666]" />
                <div>
                  <p className="text-sm text-[#666666]">Gender</p>
                  <p className="font-medium text-[#3D3D3D]">
                    {user?.gender || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-[#EEEEEE] p-4">
                <MapPin className="h-5 w-5 text-[#666666]" />
                <div>
                  <p className="text-sm text-[#666666]">Address</p>
                  <p className="font-medium text-[#3D3D3D]">
                    {user?.address || "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Login History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Login History
              </CardTitle>
              <CardDescription>Your recent login activity</CardDescription>
            </CardHeader>
            <CardContent>
              {historyLoading ? (
                <LoadingState message="Loading login history..." />
              ) : !loginHistory?.content?.length ? (
                <EmptyState
                  icon={<Clock className="h-8 w-8 text-[#666666]" />}
                  title="No login history"
                  description="Your login history will appear here."
                />
              ) : (
                <div className="space-y-3">
                  {loginHistory.content.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-4 rounded-lg border border-[#EEEEEE] p-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEEEEE]">
                        <Monitor className="h-5 w-5 text-[#666666]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="success">LOGIN</Badge>
                          <span className="text-xs text-[#666666]">
                            {formatDate(log.createdAt)}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm text-[#666666]">
                          <Globe className="h-3 w-3" />
                          <span className="font-mono text-xs">
                            {log.ipAddress || "Unknown IP"}
                          </span>
                        </div>
                        <p
                          className="mt-1 max-w-full truncate text-xs text-[#999999]"
                          title={log.userAgent}
                        >
                          {log.userAgent || "Unknown device"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
