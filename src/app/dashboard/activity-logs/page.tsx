"use client";

import { useState } from "react";
import { TopBar } from "@/components/dashboard";
import { useAuth } from "@/contexts/auth-context";
import {
  useActivityLogs,
  useActivityLogsByActionType,
  useActivityLogsByDateRange,
  useDeleteActivityLog,
  useExportActivityLogs,
} from "@/hooks/use-activity-logs";
import { ROLES, PAGINATION, ACTIVITY_TYPES } from "@/lib/constants";
import {
  Card,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Badge,
  Button,
  LoadingState,
  EmptyState,
  Alert,
  ConfirmModal,
  Pagination,
  Input,
  Label,
  Select,
} from "@/components/ui";
import {
  Activity,
  Trash2,
  Download,
  Filter,
  X,
  Calendar,
  User,
  Monitor,
  Globe,
} from "lucide-react";
import { formatDate, formatDateOnly } from "@/lib/utils";
import { UserActivityLog } from "@/types/api";

export default function ActivityLogsPage() {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(ROLES.ADMIN);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(PAGINATION.DEFAULT_SIZE);
  const [filterType, setFilterType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState(false);

  // Determine which query to use based on filters
  const hasDateFilter = startDate && endDate;
  const hasTypeFilter = filterType && filterType !== "";

  const allLogsQuery = useActivityLogs({
    page,
    size: pageSize,
  });

  const typeLogsQuery = useActivityLogsByActionType(filterType, {
    page,
    size: pageSize,
  });

  const dateRangeQuery = useActivityLogsByDateRange(
    hasDateFilter
      ? {
          startDate,
          endDate,
          page,
          size: pageSize,
        }
      : null,
  );

  // Select the appropriate data based on active filter
  const { data, isLoading, error } = hasDateFilter
    ? dateRangeQuery
    : hasTypeFilter
      ? typeLogsQuery
      : allLogsQuery;

  const deleteActivityLog = useDeleteActivityLog();
  const exportActivityLogs = useExportActivityLogs();

  // Modal states
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<UserActivityLog | null>(null);

  if (!isAdmin) {
    return (
      <>
        <TopBar
          title="Activity Logs"
          description="View system activity and audit logs"
        />
        <div className="p-6">
          <Alert variant="warning" title="Access Denied">
            You don't have permission to view this page. This feature is only
            available to administrators.
          </Alert>
        </div>
      </>
    );
  }

  const handleDelete = async () => {
    if (!selectedLog) return;
    try {
      await deleteActivityLog.mutateAsync(selectedLog.id);
      setIsDeleteOpen(false);
      setSelectedLog(null);
    } catch (error) {
      console.error("Failed to delete activity log:", error);
    }
  };

  const handleExport = async () => {
    try {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const exportStartDate =
        startDate || thirtyDaysAgo.toISOString().split("T")[0];
      const exportEndDate = endDate || today.toISOString().split("T")[0];

      const blob = await exportActivityLogs.mutateAsync({
        data: {
          startDate: exportStartDate,
          endDate: exportEndDate,
        },
        params: { page: 0, size: 1000 },
      });

      // Download the blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `activity-logs-${exportStartDate}-to-${exportEndDate}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to export activity logs:", error);
    }
  };

  const clearFilters = () => {
    setFilterType("");
    setStartDate("");
    setEndDate("");
    setPage(0);
    setIsFiltering(false);
  };

  const applyFilters = () => {
    setPage(0);
    setIsFiltering(true);
  };

  const getActivityTypeBadgeVariant = (activityType: string) => {
    switch (activityType) {
      case "LOGIN":
      case "LOGIN_ATTEMPT":
        return "success";
      case "LOGOUT":
        return "secondary";
      case "REGISTRATION":
        return "default";
      case "PASSWORD_CHANGE":
        return "warning";
      case "FORCE_LOGOUT":
      case "TOKEN_INVALIDATION":
        return "destructive";
      default:
        return "outline";
    }
  };

  const openDeleteModal = (log: UserActivityLog) => {
    setSelectedLog(log);
    setIsDeleteOpen(true);
  };

  return (
    <>
      <TopBar
        title="Activity Logs"
        description="View and manage system activity and audit logs"
      />
      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              <div className="flex-1 space-y-2">
                <Label>Action Type</Label>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">All Types</option>
                  {ACTIVITY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={applyFilters}>
                  <Filter className="h-4 w-4" />
                  Apply Filters
                </Button>
                {(filterType || startDate || endDate) && (
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleExport}
                  isLoading={exportActivityLogs.isPending}
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Logs Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <LoadingState message="Loading activity logs..." />
            ) : error ? (
              <div className="p-6">
                <Alert variant="error" title="Error loading activity logs">
                  {(error as Error).message ||
                    "Failed to load activity logs. Please try again."}
                </Alert>
              </div>
            ) : !data?.content?.length ? (
              <EmptyState
                icon={<Activity className="h-8 w-8 text-[#666666]" />}
                title="No activity logs found"
                description={
                  isFiltering
                    ? "No logs match your filter criteria. Try adjusting your filters."
                    : "There are no activity logs recorded yet."
                }
                action={
                  isFiltering && (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )
                }
              />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>IP / Device</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.content.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <Badge
                            variant={getActivityTypeBadgeVariant(
                              log.activityType,
                            )}
                          >
                            {log.activityType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-[#666666]" />
                            <div>
                              <p className="font-medium text-[#3D3D3D]">
                                {log.fullName || `User #${log.userId}`}
                              </p>
                              <p className="text-xs text-[#666666]">
                                ID: {log.userId}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-[#666666]">
                            {log.details || "—"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Globe className="h-3 w-3 text-[#666666]" />
                              <span className="font-mono text-xs">
                                {log.ipAddress || "—"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Monitor className="h-3 w-3 text-[#666666]" />
                              <span
                                className="max-w-[200px] truncate text-xs text-[#666666]"
                                title={log.userAgent}
                              >
                                {log.userAgent || "—"}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-[#666666]">
                            <Calendar className="h-4 w-4" />
                            {formatDate(log.timestamp)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteModal(log)}
                              className="text-red-500 hover:text-red-600"
                              title="Delete Log"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="border-t border-[#EEEEEE] p-4">
                  <Pagination
                    currentPage={data.number ?? page}
                    totalPages={
                      data.totalPages ??
                      Math.ceil(
                        (data.totalElements ?? data.content?.length ?? 0) /
                          pageSize,
                      )
                    }
                    totalElements={
                      data.totalElements ?? data.content?.length ?? 0
                    }
                    pageSize={data.size ?? pageSize}
                    onPageChange={setPage}
                    onPageSizeChange={(size) => {
                      setPageSize(size);
                      setPage(0);
                    }}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Log Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedLog(null);
        }}
        onConfirm={handleDelete}
        title="Delete Activity Log"
        description={`Are you sure you want to delete this activity log? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={deleteActivityLog.isPending}
      />
    </>
  );
}
