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

import useAssessmentDetails from "@/hooks/useAssessmentDetails";

export default function AssessmentDetailsPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const assessmentId = Number(params.assessmentId);

  const { assessment, loading, error, refresh } =
    useAssessmentDetails(assessmentId);

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
          description="The requested assessment may have been removed."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/admin/academic/subjects/${subjectId}/assessments`}
        label="Back to Assessments"
      />

      <AssessmentDetailsHeader
        title={assessment.title}
        difficulty={assessment.difficulty}
        status={assessment.status}
      />

      <AssessmentDetailsStats
        averageScore={assessment.averageScore}
        passingRate={assessment.passingRate}
        highestScore={assessment.highestScore}
        lowestScore={assessment.lowestScore}
      />

      <AssessmentOverviewSection
        difficulty={assessment.difficulty}
        status={assessment.status}
        duration={assessment.duration}
        passingScore={assessment.passingScore}
        randomizeQuestions={assessment.randomizeQuestions}
        randomizeOptions={assessment.randomizeOptions}
        students={assessment.students}
        averageScore={assessment.averageScore}
        passingRate={assessment.passingRate}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <AssessmentConfigurationCard
          difficulty={assessment.difficulty}
          status={assessment.status}
          duration={assessment.duration}
          passingScore={assessment.passingScore}
          randomizeQuestions={assessment.randomizeQuestions}
          randomizeOptions={assessment.randomizeOptions}
        />

        <AssessmentWeakQuestions
          subjectId={subjectId}
          questions={assessment.weakestQuestions ?? []}
        />
      </div>
    </PageContainer>
  );
}
