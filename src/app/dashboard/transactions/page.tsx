"use client";

import { useState } from "react";
import { TopBar } from "@/components/dashboard";
import { useAuth } from "@/contexts/auth-context";
import { useTransactions, useTransactionStats } from "@/hooks/use-transactions";
import { ROLES, PAGINATION } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Badge,
  Input,
  Select,
  LoadingState,
  EmptyState,
  Pagination,
  Alert,
} from "@/components/ui";
import {
  CreditCard,
  DollarSign,
  Calendar,
  Search,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  Banknote,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function TransactionsPage() {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(ROLES.ADMIN);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(PAGINATION.DEFAULT_SIZE);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchTxnRef, setSearchTxnRef] = useState("");

  const { data, isLoading, error } = useTransactions({
    page,
    size: pageSize,
    status: statusFilter || undefined,
    txnRef: searchTxnRef || undefined,
    sortBy: "createdAt",
    sortDir: "DESC",
  });

  const { data: stats, isLoading: statsLoading } = useTransactionStats();

  if (!isAdmin) {
    return (
      <>
        <TopBar title="Transactions" description="View payment transactions" />
        <div className="p-6">
          <Alert variant="warning" title="Access Denied">
            You don&apos;t have permission to view this page. This feature is
            only available to administrators.
          </Alert>
        </div>
      </>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "success";
      case "FAILED":
        return "destructive";
      case "PENDING":
        return "warning";
      case "CANCELLED":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle2 className="h-4 w-4" />;
      case "FAILED":
        return <XCircle className="h-4 w-4" />;
      case "PENDING":
        return <Clock className="h-4 w-4" />;
      case "CANCELLED":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <TopBar
        title="Transaction Management"
        description="View and search all payment transactions"
      />
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#666666]">
                Total Transactions
              </CardTitle>
              <CreditCard className="h-4 w-4 text-[#0054C5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#3D3D3D]">
                {statsLoading ? "..." : stats?.totalTransactions || 0}
              </div>
              <p className="text-xs text-[#666666] mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#666666]">
                Total Revenue
              </CardTitle>
              <Banknote className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {statsLoading ? "..." : formatAmount(stats?.totalRevenue || 0)}
              </div>
              <p className="text-xs text-[#666666] mt-1">
                From successful payments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#666666]">
                Successful
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {statsLoading ? "..." : stats?.successfulTransactions || 0}
              </div>
              <p className="text-xs text-[#666666] mt-1">Completed payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#666666]">
                Failed/Pending
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {statsLoading
                  ? "..."
                  : (stats?.failedTransactions || 0) +
                    (stats?.pendingTransactions || 0)}
              </div>
              <p className="text-xs text-[#666666] mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
                <Input
                  placeholder="Search by transaction reference..."
                  value={searchTxnRef}
                  onChange={(e) => {
                    setSearchTxnRef(e.target.value);
                    setPage(0);
                  }}
                  className="pl-9"
                />
              </div>
              <Select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(0);
                }}
                className="w-full sm:w-48"
              >
                <option value="">All Statuses</option>
                <option value="SUCCESS">Success</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
                <option value="CANCELLED">Cancelled</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <LoadingState message="Loading transactions..." />
            ) : error ? (
              <div className="p-6">
                <Alert variant="error" title="Error loading transactions">
                  {(error as Error).message ||
                    "Failed to load transactions. Please try again."}
                </Alert>
              </div>
            ) : !data?.content?.length ? (
              <EmptyState
                icon={<CreditCard className="h-8 w-8 text-[#666666]" />}
                title="No transactions found"
                description="There are no transactions matching your criteria."
              />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Transaction Ref</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Info</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.content.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-sm">
                          #{transaction.id}
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm text-[#0054C5]">
                            {transaction.txnRef}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            User #{transaction.userId}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 font-medium">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            {formatAmount(transaction.amount)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(transaction.status)}
                            className="flex items-center gap-1 w-fit"
                          >
                            {getStatusIcon(transaction.status)}
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {transaction.counterAccountName ||
                              transaction.paymentMethod ||
                              transaction.vnpBankCode ||
                              "—"}
                            {transaction.counterAccountNumber && (
                              <span className="text-[#666666] ml-1">
                                ({transaction.counterAccountNumber})
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-[#666666]">
                            <Calendar className="h-4 w-4" />
                            {transaction.createdAt
                              ? formatDate(transaction.createdAt)
                              : "—"}
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
    </>
  );
}
