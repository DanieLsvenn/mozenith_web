// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  data: T;
}

// ============================================
// Authentication Types
// ============================================

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface TokenRefreshRequest {
  refreshToken: string;
}

export interface TokenRefreshResponse {
  token: string;
  refreshToken: string;
}

export interface UserRegistrationRequest {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  email: string;
  identityCard: string;
  phone: string;
  address: string;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export interface FacebookLoginRequest {
  accessToken: string;
}

// ============================================
// User Types
// ============================================

export interface User {
  userId: number;
  username: string;
  email: string;
  fullName: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  phone?: string;
  address?: string;
  identity_Card?: string;
  role: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  emailVerified?: boolean;
}

export interface PaginatedUsers {
  content: User[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// ============================================
// Role Types
// ============================================

export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions: Permission[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRoleRequest {
  name: string;
}

export interface UpdateRoleRequest {
  name: string;
}

export interface RolePermissionsRequest {
  permissionIds: number[];
}

// ============================================
// Permission Types
// ============================================

export interface Permission {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PermissionRequest {
  name: string;
}

// ============================================
// Session Types
// ============================================

export interface BaseActionRequest {
  reason?: string;
}

// ============================================
// Activity Log Types
// ============================================

export interface UserActivityLog {
  id: number;
  userId: number;
  fullName?: string;
  activityType: string;
  status?: string;
  details?: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  browser?: string;
  browserVersion?: string;
  operatingSystem?: string;
  device?: string;
  deviceType?: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  deviceInfo?: string;
  location?: string;
}

export interface PaginatedActivityLogs {
  content: UserActivityLog[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface UserActivityLogExportRequest {
  startDate: string;
  endDate: string;
}

// ============================================
// Token Version Types
// ============================================

export interface TokenVersion {
  userId: number;
  version: number;
}

// ============================================
// Email OTP Types
// ============================================

export interface EmailRequest {
  email: string;
}

export interface OtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequestWithOtp {
  newPassword: string;
  confirmPassword: string;
  email: string;
  otp: string;
}

// ============================================
// Transaction Types
// ============================================

export interface PaymentTransaction {
  id: number;
  userId: number;
  txnRef: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
  // PayOS fields
  orderCode?: string;
  payosCode?: string;
  payosDescription?: string;
  payosTransactionRef?: string;
  paymentMethod?: string;
  counterAccountNumber?: string;
  counterAccountName?: string;
  // Legacy VNPay fields (old transactions)
  vnpResponseCode?: string;
  vnpTransactionStatus?: string;
  vnpBankCode?: string;
  vnpBankTranNo?: string;
  vnpCardType?: string;
  vnpOrderInfo?: string;
  vnpTransactionNo?: string;
  vnpPayDate?: string;
  createdAt: string;
}

export interface PaginatedTransactions {
  content: PaymentTransaction[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface TransactionQueryParams extends PaginationParams {
  id?: number;
  userId?: number;
  txnRef?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortDir?: "ASC" | "DESC";
}

// ============================================
// Quota Types
// ============================================

export type PackageType = "FREE" | "PREMIUM";

export interface QuotaResponse {
  packageType: PackageType;
  remainingToday: number;
  quotaResetDate: string;
  premiumExpiryDate?: string;
}

export interface PackageRequest {
  packageType: PackageType;
}

// ============================================
// Statistics Types
// ============================================

export interface DashboardStats {
  totalUsers: number;
  totalTransactions: number;
  totalRevenue: number;
  recentTransactions: PaymentTransaction[];
  userGrowth: number;
  premiumUsers: number;
}

// ============================================
// Pagination Types
// ============================================

export interface PaginationParams {
  page?: number;
  size?: number;
}

export interface DateRangeParams extends PaginationParams {
  startDate: string;
  endDate: string;
}

// ============================================
// Feedback / Reviews Types
// ============================================

export interface FeedbackItem {
  id: number;
  userId: number;
  username: string;
  fullName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface PaginatedFeedback {
  content: FeedbackItem[];
  // Fields may come from @PageResponse aspect or raw Spring Page<T>
  totalElements?: number;
  totalPages?: number;
  pageSize?: number;
  pageNumber?: number;
  size?: number;
  number?: number;
  last?: boolean;
  numberOfElements?: number;
}
