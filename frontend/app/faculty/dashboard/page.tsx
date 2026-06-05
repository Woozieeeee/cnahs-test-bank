"use client";

import MotionPage from "@/components/motion/motionPage";

import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";

import FacultyDashboardHeader from "@/components/faculty/dashboard/facultyDashboardHeader";

import FacultyDashboardStats from "@/components/faculty/dashboard/facultyDashboardStats";

import FacultySubjectsPreview from "@/components/faculty/dashboard/facultySubjectsPreview";

import FacultyUpcomingExams from "@/components/faculty/dashboard/facultyUpcomingExams";

import useFacultyDashboard from "@/hooks/faculty/dashboard/useFacultyDashboard";

export default function FacultyDashboardPage() {
  const { dashboard, loading, error, refresh } =
    useFacultyDashboard();

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading dashboard..."
          description="Please wait while we retrieve faculty data."
        />
      </PageContainer>
    );
  }

  if (error || !dashboard) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load dashboard."
          description={error}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  return (
    <MotionPage>
      <PageContainer>
        <FacultyDashboardHeader />

        <FacultyDashboardStats
          totalSubjects={dashboard.assignedSubjects}
          totalSections={dashboard.totalSections}
          totalStudents={dashboard.totalStudents}
          totalQuestions={dashboard.totalQuestions}
          totalExams={dashboard.totalAssessments}
        />

        <div className="grid gap-6 xl:grid-cols-2">
          <FacultySubjectsPreview
            subjects={dashboard.subjects}
            loading={loading}
            error={error}
            onRetry={refresh}
          />

          <FacultyUpcomingExams
            exams={dashboard.upcomingExams}
          />
        </div>
      </PageContainer>
    </MotionPage>
  );
}
