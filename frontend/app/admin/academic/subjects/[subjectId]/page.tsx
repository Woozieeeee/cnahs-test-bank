"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import NotFoundState from "@/components/common/states/notFoundState";

import useSubject from "@/hooks/academic/useSubject";

import SubjectDetailsHeader from "@/components/admin/academic/subjects/details/subjectDetailsHeader";
import SubjectDetailsStats from "@/components/admin/academic/subjects/details/subjectDetailsStats";
import SubjectFacultyOverview from "@/components/admin/academic/subjects/details/subjectFacultyOverview";
import SubjectReadinessAnalytics from "@/components/admin/academic/subjects/details/subjectReadinessAnalytics";
import SubjectQuestionBankSummary from "@/components/admin/academic/subjects/details/subjectQuestionBankSummary";
import SubjectAssessmentSummary from "@/components/admin/academic/subjects/details/subjectAssessmentSummary";
import { getSubjectAnalytics } from "@/services/admin_service";

interface SubjectAnalyticsData {
  subject: { id: number; name: string; code: string; description: string };
  overview: {
    totalSections: number;
    totalExams: number;
    totalQuestions: number;
    totalAttempts: number;
    estimatedTotalStudents: number;
  };
  performance: {
    averageScore: number;
    passingRate: number;
    averageQuestionSuccessRate: number;
    readinessScore: number;
  };
  sections: Array<{ id: number; name: string; yearLevel: number; program: string; faculty: { id: number; name: string } | null }>;
  questionsByDifficulty: { EASY: number; MEDIUM: number; HARD: number; EXPERT: number };
  studentPerformance: { highPerformers: number; averagePerformers: number; lowPerformers: number };
  readinessDistribution: { ready: number; atRisk: number };
}

export default function SubjectDetailsPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { subject, loading, error, refresh } =
    useSubject(subjectId);

  const [analytics, setAnalytics] = useState<SubjectAnalyticsData | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setAnalyticsLoading(true);
        setAnalyticsError(undefined);

        const response = await getSubjectAnalytics(subjectId);
        if (response.success) {
          setAnalytics(response.data);
        } else {
          setAnalyticsError("Failed to load analytics");
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setAnalyticsError(err instanceof Error ? err.message : "Failed to fetch analytics");
      } finally {
        setAnalyticsLoading(false);
      }
    };

    if (!loading && subject) {
      fetchAnalytics();
    }
  }, [subjectId, subject, loading]);

  if (loading || analyticsLoading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading subject..."
          description="Please wait while we retrieve subject information."
        />
      </PageContainer>
    );
  }

  if (error || analyticsError) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load subject."
          description={error || analyticsError || ""}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  if (!subject || !analytics) {
    return (
      <PageContainer>
        <NotFoundState
          title="Subject not found."
          description="The requested subject may have been removed."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href="/admin/academic/subjects"
        label="Back to Subjects"
      />

      <SubjectDetailsHeader subject={subject} />

      <SubjectDetailsStats
        sections={analytics.overview.totalSections}
        students={analytics.overview.estimatedTotalStudents}
        questions={analytics.overview.totalQuestions}
        assessments={analytics.overview.totalExams}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <SubjectFacultyOverview
          faculties={subject.faculties || []}
          sections={analytics.overview.totalSections}
          students={analytics.overview.estimatedTotalStudents}
        />

        <SubjectReadinessAnalytics
          average={analytics.performance.readinessScore}
          passingRate={analytics.performance.passingRate}
          expertReady={analytics.readinessDistribution.ready}
          atRisk={analytics.readinessDistribution.atRisk}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SubjectQuestionBankSummary
          totalQuestions={analytics.overview.totalQuestions}
          totalTopics={0} // Not provided in analytics
          weakQuestions={0} // Not tracked separately
          averageSuccessRate={analytics.performance.averageQuestionSuccessRate}
          subjectId={subjectId}
        />

        <SubjectAssessmentSummary
          totalAssessments={analytics.overview.totalExams}
          averageScore={analytics.performance.averageScore}
          completedAssessments={analytics.overview.totalAttempts}
          activeAssessments={analytics.overview.totalExams}
          subjectId={subjectId}
        />
      </div>
    </PageContainer>
  );
}
