"use client";

import { useMemo, useState, useEffect } from "react";

import { useParams } from "next/navigation";

import useSectionId from "@/hooks/shared/useSectionId";
import useSection from "@/hooks/academic/useSection";

import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import NotFoundState from "@/components/common/states/notFoundState";
import EmptyState from "@/components/common/states/emptyState";

import SubjectAssessmentsHeader from "@/components/admin/academic/sections/subjects/assessment/subjectAssessmentsHeader";
import SubjectAssessmentsStats from "@/components/admin/academic/sections/subjects/assessment/subjectAssessmentsStats";
import SubjectAssessmentsAnalytics from "@/components/admin/academic/sections/subjects/assessment/subjectAssessmentsAnalytics";
import SubjectAssessmentsList from "@/components/admin/academic/sections/subjects/assessment/subjectAssessmentsList";

import { getAssessmentAnalytics } from "@/services/admin_service";

interface AssessmentData {
  id: number;
  title: string;
  difficulty: string;
  status: string;
  totalQuestions: number;
  totalAttempts: number;
  passedAttempts: number;
  averageScore: number;
  passRate: number;
  passingScore: number;
  startsAt?: string | null;
  endsAt?: string | null;
  topPerformers: Array<{ studentName: string; score: number }>;
}

interface AssessmentAnalyticsResponse {
  success: boolean;
  data: {
    section: { id: number; name: string };
    subject: { id: number; name: string; code: string };
    assessments: AssessmentData[];
    stats: {
      totalExams: number;
      totalAttempts: number;
      averageScore: number;
      overallPassRate: number;
    };
  };
}

export default function SubjectAssessmentsPage() {
  const sectionId = useSectionId();

  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { section, loading, error, refresh } =
    useSection(sectionId);

  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [stats, setStats] = useState<AssessmentAnalyticsResponse["data"]["stats"] | null>(null);
  const [assessmentsLoading, setAssessmentsLoading] = useState(false);
  const [assessmentsError, setAssessmentsError] = useState<string | undefined>(undefined);

  // =========================
  // FETCH ASSESSMENTS FROM API
  // =========================

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setAssessmentsLoading(true);
        setAssessmentsError(undefined);

        const response = await getAssessmentAnalytics(sectionId, subjectId) as AssessmentAnalyticsResponse;

        if (response.success) {
          setAssessments(response.data.assessments);
          setStats(response.data.stats);
        } else {
          setAssessmentsError("Failed to load assessments");
        }
      } catch (err) {
        console.error("Error fetching assessments:", err);
        setAssessmentsError(
          err instanceof Error ? err.message : "Failed to load assessments"
        );
      } finally {
        setAssessmentsLoading(false);
      }
    };

    if (sectionId && subjectId && !loading) {
      fetchAssessments();
    }
  }, [sectionId, subjectId, loading]);

  // =========================
  // SUBJECT
  // =========================

  const sectionSubject = useMemo(() => {
    if (!section) return null;

    return section.sectionSubjects.find(
      (item) => item.subject.id === subjectId
    ) || null;
  }, [section, subjectId]);

  // =========================
  // LOADING
  // =========================

  if (loading || assessmentsLoading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading assessments..."
          description="Please wait while we retrieve assessment information."
        />
      </PageContainer>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || assessmentsError) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load assessments."
          description={error || assessmentsError}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  // =========================
  // NOT FOUND
  // =========================

  if (!section || !sectionSubject) {
    return (
      <PageContainer>
        <NotFoundState
          title="Subject not found."
          description="The requested subject may have been removed or is not assigned to this section."
        />
      </PageContainer>
    );
  }

  if (!stats) {
    return (
      <PageContainer>
        <EmptyState
          title="No assessments found."
          description="There are no assessments for this subject in this section."
        />
      </PageContainer>
    );
  }

  const subject = sectionSubject.subject;

  return (
    <PageContainer>
      {/* HEADER */}

      <SubjectAssessmentsHeader
        sectionId={sectionId}
        subject={subject}
      />

      {/* STATS */}

      <SubjectAssessmentsStats
        totalAssessments={stats.totalExams}
        ongoingAssessments={assessments.filter((a) => a.status === "ONGOING").length}
        passRate={stats.overallPassRate}
        totalViolations={0} // Not tracked in current API
      />

      {/* ANALYTICS */}

      <SubjectAssessmentsAnalytics
        analytics={{
          progression: {
            easy: assessments.filter((a) => a.difficulty === "EASY").length,
            medium: assessments.filter((a) => a.difficulty === "MEDIUM").length,
            hard: assessments.filter((a) => a.difficulty === "HARD").length,
            expert: assessments.filter((a) => a.difficulty === "EXPERT").length,
          },
          trend: assessments.slice(0, 5).map((a) => ({
            label: a.title.substring(0, 10),
            score: a.averageScore,
          })),
        }}
      />

      {/* ASSESSMENTS */}

      {assessments.length === 0 ? (
        <EmptyState
          title="No assessments found."
          description="There are no assessments for this subject in this section."
        />
      ) : (
        <SubjectAssessmentsList
          sectionId={sectionId}
          subjectId={subject.id}
          assessments={assessments.map((a) => ({
            id: a.id,
            title: a.title,
            difficulty: a.difficulty,
            status: a.status,
            averageScore: a.averageScore,
            passRate: a.passRate,
            violations: 0, // Not tracked per assessment in current API
            totalStudents: a.totalAttempts,
            createdAt: new Date().toISOString(), // Not available in API
            duration: 0, // Not provided in API response
            startsAt: a.startsAt ? a.startsAt.toString() : undefined,
            endsAt: a.endsAt ? a.endsAt.toString() : undefined,
          }))}
        />
      )}
    </PageContainer>
  );
}
