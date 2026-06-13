"use client";

import { useEffect, useState, memo } from "react";
import { useRouter } from "next/navigation";
import useProtectedRoute from "@/hooks/auth/useProtectedRoute";
import { useDashboardData } from "@/hooks/student/useDashboardData";
import { getTimeBasedGreeting } from "@/lib/greetings";
import DashboardStatCard from "@/components/student/dashboard/dashboardStatCard";
import DashboardCharts from "@/components/student/dashboard/dashboardCharts";
import DashboardQuickActions from "@/components/student/dashboard/dashboardQuickActions";
import DashboardTopSubjects from "@/components/student/dashboard/dashboardTopSubjects";
import EmptyState from "@/components/common/states/emptyState";
import PageContainer from "@/components/layout/pages/pageContainer";
import PageHeader from "@/components/layout/pages/pageHeader";
import PageTitle from "@/components/layout/pages/pageTitle";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle, BookOpen, Zap, Target, Award } from "lucide-react";

function StudentDashboardPageComponent() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useProtectedRoute(["STUDENT"]);
  const { dashboardData, isLoading, error, statusData, tierBreakdown } = useDashboardData();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [greeting, setGreeting] = useState({ greeting: "Welcome", emoji: "👋" });

  // Update greeting when user changes or on component mount
  useEffect(() => {
    if (user) {
      setGreeting(getTimeBasedGreeting(user.isFirstLogin));
    }
  }, [user]);

  // Auto-refresh greeting every minute to catch time changes
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      setGreeting(getTimeBasedGreeting(user.isFirstLogin));
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (dashboardData && dashboardData.subjects.length > 0 && selectedSubject === null) {
      const topSubject = dashboardData.subjects.reduce((prev, current) =>
        prev.progress > current.progress ? prev : current
      );
      setSelectedSubject(topSubject.slug);
    }
  }, [dashboardData, selectedSubject]);

  if (loading || !isAuthenticated) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle title="Dashboard" description="Loading your progress..." />
        </PageHeader>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </PageContainer>
    );
  }

  if (error || !dashboardData) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle title="Dashboard" description="View your exam progress" />
        </PageHeader>
        <div className="mt-8">
          <Card className="border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-600" size={24} />
              <div>
                <h3 className="font-semibold text-red-900">Failed to Load Dashboard</h3>
                <p className="text-sm text-red-700 mt-1">{error || "An unexpected error occurred."}</p>
              </div>
            </div>
          </Card>
        </div>
      </PageContainer>
    );
  }

  const { stats, subjects } = dashboardData;

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          title={`${greeting.greeting}! ${greeting.emoji}`}
          description={`${user?.name}, here's your learning progress`}
        />
      </PageHeader>

      {/* KEY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <DashboardStatCard
          title="Enrolled Subjects"
          value={stats.totalSubjects}
          description="Total courses"
          icon={<BookOpen size={28} />}
        />
        <DashboardStatCard
          title="In Progress"
          value={stats.activeSubjects}
          description="Currently learning"
          icon={<Zap size={28} />}
        />
        <DashboardStatCard
          title="Completed"
          value={stats.completedSubjects}
          description="Mastered subjects"
          icon={<Award size={28} />}
        />
        <DashboardStatCard
          title="Overall Progress"
          value={`${stats.overallProgress}%`}
          description="Your achievement rate"
          icon={<Target size={28} />}
        />
      </div>

      {/* CHARTS AND INSIGHTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <DashboardCharts statusData={statusData} tierBreakdown={tierBreakdown} />
        <DashboardQuickActions
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          subjects={subjects}
        />
      </div>

      {/* TOP SUBJECTS SECTION */}
      <DashboardTopSubjects subjects={subjects} />

      {subjects.length === 0 && (
        <div className="mt-12">
          <EmptyState
            title="No subjects enrolled yet"
            description="You don't have any subjects yet. Contact your instructor to get enrolled."
          />
        </div>
      )}
    </PageContainer>
  );
}

const StudentDashboardPage = memo(StudentDashboardPageComponent);
export default StudentDashboardPage;
