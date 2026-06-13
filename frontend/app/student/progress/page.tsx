"use client";

import { memo } from "react";
import useProtectedRoute from "@/hooks/auth/useProtectedRoute";
import { useProgressData } from "@/hooks/student/useProgressData";
import ProgressHeader from "@/components/student/progress/progressHeader";
import ProgressTierStats from "@/components/student/progress/progressTierStats";
import ProgressSubjectsList from "@/components/student/progress/progressSubjectsList";
import PageContainer from "@/components/layout/pages/pageContainer";
import PageHeader from "@/components/layout/pages/pageHeader";
import PageTitle from "@/components/layout/pages/pageTitle";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";

function StudentProgressPageComponent() {
  const { user, loading: authLoading, isAuthenticated } = useProtectedRoute(["STUDENT"]);
  const { progressData, isLoading, error, tierStatsByDifficulty, sortedSubjects } = useProgressData();

  if (authLoading || !isAuthenticated) {
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
          <PageTitle title="Progress" description="Loading your progress..." />
        </PageHeader>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </PageContainer>
    );
  }

  if (error || !progressData) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle title="Progress" description="View your detailed progress" />
        </PageHeader>
        <div className="mt-8">
          <Card className="border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-600" size={24} />
              <div>
                <h3 className="font-semibold text-red-900">Failed to Load Progress</h3>
                <p className="text-sm text-red-700 mt-1">{error || "An unexpected error occurred."}</p>
              </div>
            </div>
          </Card>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          title="Your Progress"
          description={`Welcome back, ${user?.name}! Track your learning journey across all subjects and difficulty tiers.`}
        />
      </PageHeader>

      {/* PROGRESS HEADER */}
      <div className="mt-12">
        <ProgressHeader
          totalSubjects={progressData.totalSubjects}
          completedSubjects={progressData.completedSubjects}
          activeSubjects={progressData.activeSubjects}
          overallProgress={progressData.overallProgress}
          averageScore={progressData.averageScore}
        />
      </div>

      {/* TIER STATS */}
      <div className="mt-12">
        <ProgressTierStats tierStats={tierStatsByDifficulty} />
      </div>

      {/* SUBJECTS LIST */}
      <div className="mt-12">
        <ProgressSubjectsList subjects={sortedSubjects} />
      </div>
    </PageContainer>
  );
}

const StudentProgressPage = memo(StudentProgressPageComponent);
export default StudentProgressPage;
