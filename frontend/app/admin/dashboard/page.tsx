"use client";

import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getRecentRegistrations,
} from "@/services/admin_service";

import DashboardHeader from "@/components/admin/dashboard/dashboardHeader";

import QuickAccessSection from "@/components/admin/dashboard/quickAccessSection";

import SystemOverviewSection from "@/components/admin/dashboard/systemOverviewSection";

import RecentRegistrationsTable from "@/components/admin/dashboard/recent_registrations/recentRegistrationsTable";

import RecentActivitySection from "@/components/admin/dashboard/recentActivitySection";

import DashboardLoader from "@/components/admin/dashboard/dashboardLoader";

interface DashboardStats {
  totalStudents: number;

  pendingAccounts: number;

  approvedAccounts: number;

  totalFaculty: number;

  totalExams: number;
}

interface RecentRegistration {
  id: number;

  name: string;

  studentId: string;

  status: string;

  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(
    null
  );

  const [recentRegistrations, setRecentRegistrations] =
    useState<RecentRegistration[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsData = await getDashboardStats();

        const registrationsData =
          await getRecentRegistrations();

        setStats(statsData);

        setRecentRegistrations(registrationsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !stats) {
    return <DashboardLoader />;
  }

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <QuickAccessSection />

      <SystemOverviewSection stats={stats} />

      <RecentRegistrationsTable
        registrations={recentRegistrations}
      />

      <RecentActivitySection />
    </div>
  );
}
