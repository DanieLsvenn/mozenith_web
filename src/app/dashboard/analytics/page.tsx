"use client";

import { TopBar } from "@/components/dashboard";
import { useAuth } from "@/contexts/auth-context";
import { useUsers } from "@/hooks/use-users";
import { useActivityLogs } from "@/hooks/use-activity-logs";
import { useTransactions, useTransactionStats } from "@/hooks/use-transactions";
import { ROLES } from "@/lib/constants";
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
  LoadingState,
  Alert,
} from "@/components/ui";
import {
  Users,
  CreditCard,
  Activity,
  DollarSign,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
  BarChart3,
  PieChart,
  ArrowUpRight,
  Banknote,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function AnalyticsPage() {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(ROLES.ADMIN);

  // Fetch data for analytics
  const { data: usersData, isLoading: usersLoading } = useUsers({
    page: 0,
    size: 1000,
  });
  const { data: logsData, isLoading: logsLoading } = useActivityLogs({
    page: 0,
    size: 100,
  });
  const { data: transactionsData, isLoading: transactionsLoading } =
    useTransactions({
      page: 0,
      size: 10,
      sortBy: "createdAt",
      sortDir: "DESC",
    });
  const { data: transactionStats, isLoading: statsLoading } =
    useTransactionStats();

  if (!isAdmin) {
    return (
      <>
        <TopBar title="Analytics" description="View system analytics" />
        <div className="p-6">
          <Alert variant="warning" title="Access Denied">
            You don&apos;t have permission to view this page. This feature is
            only available to administrators.
          </Alert>
        </div>
      </>
    );
  }

  const isLoading =
    usersLoading || logsLoading || transactionsLoading || statsLoading;

  // Calculate user statistics
  const totalUsers = usersData?.totalElements || 0;
  const activeUsers =
    usersData?.content?.filter((u) => u.status === "ACTIVE" || !u.status)
      .length || 0;
  const verifiedUsers =
    usersData?.content?.filter((u) => u.emailVerified).length || 0;

  // Calculate activity statistics
  const recentLogins =
    logsData?.content?.filter((log) => log.activityType === "LOGIN").length ||
    0;
  const recentRegistrations =
    logsData?.content?.filter((log) => log.activityType === "REGISTRATION")
      .length || 0;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "success";
      case "FAILED":
        return "destructive";
      case "PENDING":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <TopBar
        title="Analytics Dashboard"
        description="Comprehensive overview of system metrics and performance"
      />
      <div className="p-6 space-y-6">
        {isLoading ? (
          <LoadingState message="Loading analytics..." />
        ) : (
          <>
            {/* Main Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Total Users */}
              <Card className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#666666]">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-[#0054C5]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#3D3D3D]">
                    {totalUsers}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="success" className="text-xs">
                      <UserCheck className="h-3 w-3 mr-1" />
                      {activeUsers} Active
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {verifiedUsers} Verified
                    </Badge>
                  </div>
                </CardContent>
                <div className="absolute right-0 bottom-0 opacity-5">
                  <Users className="h-24 w-24" />
                </div>
              </Card>

              {/* Total Revenue */}
              <Card className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#666666]">
                    Total Revenue
                  </CardTitle>
                  <Banknote className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {formatAmount(transactionStats?.totalRevenue || 0)}
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>
                      From {transactionStats?.successfulTransactions || 0}{" "}
                      payments
                    </span>
                  </div>
                </CardContent>
                <div className="absolute right-0 bottom-0 opacity-5">
                  <DollarSign className="h-24 w-24" />
                </div>
              </Card>

              {/* Transactions */}
              <Card className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#666666]">
                    Transactions
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-[#0054C5]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#3D3D3D]">
                    {transactionStats?.totalTransactions || 0}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="success" className="text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {transactionStats?.successfulTransactions || 0}
                    </Badge>
                    <Badge variant="warning" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {transactionStats?.pendingTransactions || 0}
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                      <XCircle className="h-3 w-3 mr-1" />
                      {transactionStats?.failedTransactions || 0}
                    </Badge>
                  </div>
                </CardContent>
                <div className="absolute right-0 bottom-0 opacity-5">
                  <CreditCard className="h-24 w-24" />
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#666666]">
                    Recent Activity
                  </CardTitle>
                  <Activity className="h-4 w-4 text-[#0054C5]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#3D3D3D]">
                    {logsData?.totalElements || 0}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {recentLogins} Logins
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {recentRegistrations} Registrations
                    </Badge>
                  </div>
                </CardContent>
                <div className="absolute right-0 bottom-0 opacity-5">
                  <Activity className="h-24 w-24" />
                </div>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Transaction Success Rate */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-[#0054C5]" />
                    Transaction Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactionStats &&
                    transactionStats.totalTransactions > 0 ? (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500" />
                            <span className="text-sm text-[#666666]">
                              Success
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {Math.round(
                                (transactionStats.successfulTransactions /
                                  transactionStats.totalTransactions) *
                                  100,
                              )}
                              %
                            </span>
                            <span className="text-sm text-[#666666]">
                              ({transactionStats.successfulTransactions})
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-500 h-3 rounded-full transition-all"
                            style={{
                              width: `${
                                (transactionStats.successfulTransactions /
                                  transactionStats.totalTransactions) *
                                100
                              }%`,
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-yellow-500" />
                            <span className="text-sm text-[#666666]">
                              Pending
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {Math.round(
                                (transactionStats.pendingTransactions /
                                  transactionStats.totalTransactions) *
                                  100,
                              )}
                              %
                            </span>
                            <span className="text-sm text-[#666666]">
                              ({transactionStats.pendingTransactions})
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-yellow-500 h-3 rounded-full transition-all"
                            style={{
                              width: `${
                                (transactionStats.pendingTransactions /
                                  transactionStats.totalTransactions) *
                                100
                              }%`,
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500" />
                            <span className="text-sm text-[#666666]">
                              Failed
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {Math.round(
                                (transactionStats.failedTransactions /
                                  transactionStats.totalTransactions) *
                                  100,
                              )}
                              %
                            </span>
                            <span className="text-sm text-[#666666]">
                              ({transactionStats.failedTransactions})
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-red-500 h-3 rounded-full transition-all"
                            style={{
                              width: `${
                                (transactionStats.failedTransactions /
                                  transactionStats.totalTransactions) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-[#666666]">
                        No transaction data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* User Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#0054C5]" />
                    User Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Users className="h-5 w-5 text-[#0054C5]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#666666]">
                            Total Registered
                          </p>
                          <p className="font-semibold">{totalUsers} users</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <UserCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-[#666666]">Active Users</p>
                          <p className="font-semibold">{activeUsers} users</p>
                        </div>
                      </div>
                      <Badge variant="success">
                        {totalUsers > 0
                          ? Math.round((activeUsers / totalUsers) * 100)
                          : 0}
                        %
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-[#666666]">
                            Email Verified
                          </p>
                          <p className="font-semibold">{verifiedUsers} users</p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {totalUsers > 0
                          ? Math.round((verifiedUsers / totalUsers) * 100)
                          : 0}
                        %
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#0054C5]" />
                  Recent Transactions
                </CardTitle>
                <Link
                  href="/dashboard/transactions"
                  className="text-sm text-[#0054C5] hover:underline flex items-center gap-1"
                >
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </CardHeader>
              <CardContent>
                {transactionsData?.content?.length ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction Ref</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactionsData.content.slice(0, 5).map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-mono text-sm text-[#0054C5]">
                            {tx.txnRef}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">User #{tx.userId}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatAmount(tx.amount)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(tx.status)}>
                              {tx.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-[#666666]">
                            {formatDate(tx.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-[#666666]">
                    No recent transactions
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="grid gap-4 md:grid-cols-3">
              <Link href="/dashboard/users">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-[#0054C5]">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Users className="h-6 w-6 text-[#0054C5]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3D3D3D]">
                        Manage Users
                      </p>
                      <p className="text-sm text-[#666666]">
                        View and manage all users
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/transactions">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <CreditCard className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3D3D3D]">
                        Transactions
                      </p>
                      <p className="text-sm text-[#666666]">
                        View payment history
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/activity-logs">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-500">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Activity className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3D3D3D]">
                        Activity Logs
                      </p>
                      <p className="text-sm text-[#666666]">
                        Monitor user activities
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
