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
