"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { DashboardSidebar } from "@/components/dashboard";
import { LoadingState } from "@/components/ui";
import { ROUTES } from "@/lib/constants";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <LoadingState message="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Show loading while redirecting
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <LoadingState message="Redirecting to login..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      <DashboardSidebar />
      <main className="lg:pl-64">{children}</main>
    </div>
  );
}
