"use client";

import { useState } from "react";

import AppSidebar from "@/components/layout/sidebar/appSidebar";

import Navbar from "@/components/layout/navbar/navbar";

import MobileSidebar from "@/components/layout/sidebar/mobileSidebar";

import { SidebarProvider } from "@/components/layout/sidebar/sidebarContext";

import { facultyNav } from "@/config/navigation/facultyNav";

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
        />

        <div className="flex-1">
          <Navbar
            userName="Faculty User"
            role="Faculty"
            onMenuClick={() => setMobileOpen(true)}
          />

          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
