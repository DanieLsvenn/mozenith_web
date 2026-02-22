export const API_BASE_URL = "https://mozenith-be.onrender.com";

export const AUTH_COOKIES = {
  ACCESS_TOKEN: "mozenith_access_token",
  REFRESH_TOKEN: "mozenith_refresh_token",
  USER: "mozenith_user",
} as const;

export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  STAFF: "STAFF",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];

export const ROUTES = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",

  // Protected routes
  DASHBOARD: "/dashboard",
  USERS: "/dashboard/users",
  ROLES: "/dashboard/roles",
  PERMISSIONS: "/dashboard/permissions",
  SESSIONS: "/dashboard/sessions",
  ACTIVITY_LOGS: "/dashboard/activity-logs",
  PROFILE: "/dashboard/profile",
} as const;

export const ACTIVITY_TYPES = [
  "LOGIN",
  "LOGIN_ATTEMPT",
  "LOGOUT",
  "REGISTRATION",
  "PASSWORD_CHANGE",
  "PROFILE_UPDATE",
  "ROLE_CHANGE",
  "PERMISSION_CHANGE",
  "FORCE_LOGOUT",
  "TOKEN_INVALIDATION",
] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const PAGINATION = {
  DEFAULT_PAGE: 0,
  DEFAULT_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;
