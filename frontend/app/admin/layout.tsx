"use client";

import AppSidebar from "@/components/layout/sidebar/appSidebar";

import Navbar from "@/components/layout/navbar/navbar";

import { SidebarProvider } from "@/components/layout/sidebar/sidebarContext";

import useProtectedRoute from "@/hooks/auth/useProtectedRoute";

import { adminNav } from "@/config/navigation/adminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useProtectedRoute(["ADMIN"]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="bg-background text-foreground flex min-h-screen">
        {/* SIDEBAR */}

        <AppSidebar
          title="CNAHS Admin"
          subtitle="Monitoring & oversight panel"
          navItems={adminNav}
        />

        {/* MAIN CONTENT */}

        <div className="flex-1">
          {/* NAVBAR */}

          <Navbar userName="Administrator" role="Admin" />

          {/* PAGE CONTENT */}

          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
