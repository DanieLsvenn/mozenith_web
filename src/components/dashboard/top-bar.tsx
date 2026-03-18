"use client";

import { useAuth } from "@/contexts/auth-context";
import { Badge } from "@/components/ui";
import { ROLES } from "@/lib/constants";

interface TopBarProps {
  title: string;
  description?: string;
}

export function TopBar({ title, description }: TopBarProps) {
  const { user } = useAuth();

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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#EEEEEE] bg-white/80 px-6 backdrop-blur-sm">
      <div>
        <h1 className="text-lg font-semibold text-[#3D3D3D]">{title}</h1>
        {description && <p className="text-sm text-[#666666]">{description}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-[#3D3D3D]">
              {user?.fullName || user?.username}
            </p>
            <div className="flex items-center gap-1">
              {user?.role && (
                <Badge
                  variant={getRoleBadgeVariant(user.role)}
                  className="text-[10px]"
                >
                  {user.role}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#99E7F1] text-sm font-medium text-[#0054C5]">
            {user?.fullName?.charAt(0) || user?.username?.charAt(0) || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
