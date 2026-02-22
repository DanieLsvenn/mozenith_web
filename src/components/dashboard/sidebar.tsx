"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { ROUTES, ROLES } from "@/lib/constants";
import { Button, Badge } from "@/components/ui";
import {
  Users,
  Shield,
  Key,
  Activity,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Settings,
  Menu,
  X,
  MonitorSmartphone,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Users",
    href: ROUTES.USERS,
    icon: <Users className="h-5 w-5" />,
    adminOnly: true,
  },
  {
    label: "Roles",
    href: ROUTES.ROLES,
    icon: <Shield className="h-5 w-5" />,
    adminOnly: true,
  },
  {
    label: "Permissions",
    href: ROUTES.PERMISSIONS,
    icon: <Key className="h-5 w-5" />,
    adminOnly: true,
  },
  {
    label: "Sessions",
    href: ROUTES.SESSIONS,
    icon: <MonitorSmartphone className="h-5 w-5" />,
  },
  {
    label: "Activity Logs",
    href: ROUTES.ACTIVITY_LOGS,
    icon: <Activity className="h-5 w-5" />,
    adminOnly: true,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, hasRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isAdmin = hasRole(ROLES.ADMIN);

  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin,
  );

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-[#0054C5] p-2 text-white lg:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#0054C5] transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-[#003D91] px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white overflow-hidden">
            <img
              src="/pictures/mozenith.jpg"
              alt="Mozenith Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-lg font-bold text-white">Mozenith</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#99E7F1] text-[#0054C5]"
                    : "text-white/80 hover:bg-[#003D91] hover:text-white",
                )}
              >
                {item.icon}
                {item.label}
                {item.adminOnly && (
                  <Badge variant="secondary" className="ml-auto text-[10px]">
                    Admin
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-[#003D91] p-3">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[#003D91]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#99E7F1] text-sm font-medium text-[#0054C5]">
                {user?.fullName?.charAt(0) || user?.username?.charAt(0) || "U"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">
                  {user?.fullName || user?.username}
                </p>
                <p className="truncate text-xs text-white/70">
                  {user?.roles?.[0]?.name || "User"}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/70 transition-transform",
                  showUserMenu && "rotate-180",
                )}
              />
            </button>

            {showUserMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-full rounded-lg border border-[#003D91] bg-[#0054C5] py-1 shadow-lg">
                <Link
                  href={ROUTES.PROFILE}
                  onClick={() => {
                    setShowUserMenu(false);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-[#003D91]"
                >
                  <Settings className="h-4 w-4" />
                  Profile Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#FF4D4F] hover:bg-[#003D91]"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
