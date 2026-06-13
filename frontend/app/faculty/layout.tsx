"use client";

import { useState } from "react";

import AppSidebar from "@/components/layout/sidebar/appSidebar";

import Navbar from "@/components/layout/navbar/navbar";

import MobileSidebar from "@/components/layout/sidebar/mobileSidebar";

import { SidebarProvider } from "@/components/layout/sidebar/sidebarContext";

import useProtectedRoute from "@/hooks/auth/useProtectedRoute";

import { facultyNav } from "@/config/navigation/facultyNav";

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useProtectedRoute(["FACULTY"]);

  if (loading) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar
          title="CNAHS Faculty"
          subtitle="Teaching & Assessment Portal"
          navItems={facultyNav}
        />

        <MobileSidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          navItems={facultyNav}
          title="CNAHS Faculty"
          subtitle="Teaching & Assessment Portal"
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            userName={user?.name ?? "Faculty"}
            userRole="FACULTY"
            hasAvatar={user?.hasAvatar}
            avatarVersion={user?.updatedAt}
            mobileMenuOpen={mobileOpen}
            onMenuClick={() => setMobileOpen((open) => !open)}
          />

          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
