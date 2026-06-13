"use client";

import { useState } from "react";

import AppSidebar from "@/components/layout/sidebar/appSidebar";

import Navbar from "@/components/layout/navbar/navbar";

import MobileSidebar from "@/components/layout/sidebar/mobileSidebar";

import { SidebarProvider } from "@/components/layout/sidebar/sidebarContext";

import useProtectedRoute from "@/hooks/auth/useProtectedRoute";

import { adminNav } from "@/config/navigation/adminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useProtectedRoute(["ADMIN"]);

  if (loading) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="bg-background text-foreground flex min-h-screen">
        <AppSidebar
          title="CNAHS Admin"
          subtitle="Monitoring & oversight panel"
          navItems={adminNav}
        />

        <MobileSidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          navItems={adminNav}
          title="CNAHS Admin"
          subtitle="Monitoring & oversight panel"
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            userName={user?.name ?? "Administrator"}
            userRole="ADMIN"
            hasAvatar={user?.hasAvatar}
            avatarVersion={user?.updatedAt}
            mobileMenuOpen={mobileOpen}
            onMenuClick={() => setMobileOpen((open) => !open)}
          />

          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
