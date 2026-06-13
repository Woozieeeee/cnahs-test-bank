"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useProtectedRoute from "@/hooks/auth/useProtectedRoute";
import AppSidebar from "@/components/layout/sidebar/appSidebar";
import MobileSidebar from "@/components/layout/sidebar/mobileSidebar";
import Navbar from "@/components/layout/navbar/navbar";
import { SidebarProvider } from "@/components/layout/sidebar/sidebarContext";
import { studentNav } from "@/config/navigation/studentNav";

interface StudentLayoutProps {
  children: React.ReactNode;
}

function StudentLayoutContent({ children }: StudentLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, isAuthenticated } = useProtectedRoute(["STUDENT"]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isExamPage = pathname.includes("/exam/");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full" />
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isExamPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar
          title="CNAHS"
          subtitle="Student Portal"
          navItems={studentNav}
        />

        <MobileSidebar
          open={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navItems={studentNav}
          title="CNAHS"
          subtitle="Student Portal"
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar
            userName={user.name || "Student"}
            userRole="STUDENT"
            hasAvatar={user.hasAvatar}
            avatarVersion={user.updatedAt}
            mobileMenuOpen={isMobileMenuOpen}
            onMenuClick={() => setIsMobileMenuOpen((open) => !open)}
          />

          <main className="flex-1 overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <StudentLayoutContent>
      {children}
    </StudentLayoutContent>
  );
}
