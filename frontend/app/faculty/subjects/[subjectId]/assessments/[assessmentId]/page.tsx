"use client";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import NotFoundState from "@/components/common/states/notFoundState";

import AssessmentDetailsHeader from "@/components/admin/academic/subjects/assessments/details/assessmentDetailsHeader";

import AssessmentDetailsStats from "@/components/admin/academic/subjects/assessments/details/assessmentDetailsStats";

import AssessmentOverviewSection from "@/components/admin/academic/subjects/assessments/details/assessmentOverviewSection";

import AssessmentConfigurationCard from "@/components/admin/academic/subjects/assessments/details/assessmentConfigurationCard";

import AssessmentWeakQuestions from "@/components/admin/academic/subjects/assessments/details/assessmentWeakQuestions";

import useFacultyAssessmentDetails from "@/hooks/faculty/assessments/useFacultyAssessmentDetails";

export default function FacultyAssessmentDetailsPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const assessmentId = Number(params.assessmentId);

  const { assessment, loading, error, refresh } =
    useFacultyAssessmentDetails(subjectId, assessmentId);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading assessment..."
          description="Please wait while we retrieve assessment details."
        />
      </PageContainer>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load assessment."
          description={error}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  // =========================
  // NOT FOUND
  // =========================

  if (!assessment) {
    return (
      <PageContainer>
        <NotFoundState
          title="Assessment not found."
          description="The requested assessment may have been removed or you don't have access to it."
        />
      </PageContainer>
    );
  }

  // Safe data access with defaults
  const assessmentData = {
    title: assessment.title ?? "Untitled Assessment",
    difficulty: assessment.difficulty ?? "MEDIUM",
    status: assessment.status ?? "DRAFT",
    averageScore: assessment.averageScore ?? 0,
    passingRate: assessment.passingRate ?? 0,
    highestScore: assessment.highestScore ?? 0,
    lowestScore: assessment.lowestScore ?? 0,
    duration: assessment.duration ?? 0,
    passingScore: assessment.passingScore ?? 0,
    randomizeQuestions: assessment.randomizeQuestions ?? false,
    randomizeOptions: assessment.randomizeOptions ?? false,
    students: assessment.students ?? 0,
    weakestQuestions: assessment.weakestQuestions ?? [],
  };

  return (
    <PageContainer>
      <BackButton
        href={`/faculty/subjects/${subjectId}/assessments`}
        label="Back to Assessments"
      />

      <AssessmentDetailsHeader
        title={assessmentData.title}
        difficulty={assessmentData.difficulty}
        status={assessmentData.status}
      />

      <AssessmentDetailsStats
        averageScore={assessmentData.averageScore}
        passingRate={assessmentData.passingRate}
        highestScore={assessmentData.highestScore}
        lowestScore={assessmentData.lowestScore}
      />

      <AssessmentOverviewSection
        difficulty={assessmentData.difficulty}
        status={assessmentData.status}
        duration={assessmentData.duration}
        passingScore={assessmentData.passingScore}
        randomizeQuestions={assessmentData.randomizeQuestions}
        randomizeOptions={assessmentData.randomizeOptions}
        students={assessmentData.students}
        averageScore={assessmentData.averageScore}
        passingRate={assessmentData.passingRate}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <AssessmentConfigurationCard
          difficulty={assessmentData.difficulty}
          status={assessmentData.status}
          duration={assessmentData.duration}
          passingScore={assessmentData.passingScore}
          randomizeQuestions={assessmentData.randomizeQuestions}
          randomizeOptions={assessmentData.randomizeOptions}
        />

        <AssessmentWeakQuestions
          subjectId={subjectId}
          questions={assessmentData.weakestQuestions}
        />
      </div>
    </PageContainer>
  );
}
