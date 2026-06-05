"use client";

import { useParams } from "next/navigation";

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
import { mockSubjectDetails } from "@/components/admin/academic/subjects/data/mockSubjectDetails";
import useSubjectQuestionStats from "@/hooks/faculty/subjects/useSubjectQuestionStats";
import useSubjectAssessmentSummary from "@/hooks/faculty/subjects/useSubjectAssessmentSummary";

export default function SubjectDetailsPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { subject, loading, error, refresh } =
    useSubject(subjectId);

  const {
    stats: questionStats,
    loading: questionStatsLoading,
    error: questionStatsError,
  } = useSubjectQuestionStats(subjectId);

  const {
    summary: assessmentSummary,
    loading: assessmentSummaryLoading,
    error: assessmentSummaryError,
  } = useSubjectAssessmentSummary(subjectId);

  if (
    loading ||
    questionStatsLoading ||
    assessmentSummaryLoading
  ) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading subject..."
          description="Please wait while we retrieve subject information."
        />
      </PageContainer>
    );
  }

  if (
    error ||
    questionStatsError ||
    assessmentSummaryError
  ) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load subject."
          description={
            error ||
            questionStatsError ||
            assessmentSummaryError ||
            ""
          }
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  if (!subject) {
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
        sections={
          subject.sectionSummary?.totalSections ?? 0
        }
        students={
          subject.sectionSummary?.totalStudents ?? 0
        }
        questions={
          subject.questionBankSummary?.totalQuestions ?? 0
        }
        assessments={
          subject.assessmentSummary?.totalAssessments ?? 0
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <SubjectFacultyOverview
          faculties={subject.faculties || []}
          sections={
            subject.sectionSummary?.totalSections ?? 0
          }
          students={
            subject.sectionSummary?.totalStudents ?? 0
          }
        />

        <SubjectReadinessAnalytics
          average={mockSubjectDetails.readiness.average}
          passingRate={
            mockSubjectDetails.readiness.passingRate
          }
          expertReady={
            mockSubjectDetails.readiness.expertReady
          }
          atRisk={mockSubjectDetails.readiness.atRisk}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SubjectQuestionBankSummary
          totalQuestions={
            questionStats?.totalQuestions ?? 0
          }
          totalTopics={questionStats?.totalTopics ?? 0}
          weakQuestions={questionStats?.weakQuestions ?? 0}
          averageSuccessRate={
            questionStats?.averageSuccessRate ?? 0
          }
          subjectId={subjectId}
        />

        <SubjectAssessmentSummary
          totalAssessments={
            assessmentSummary?.totalAssessments ?? 0
          }
          averageScore={
            assessmentSummary?.averageScore ?? 0
          }
          completedAssessments={
            assessmentSummary?.completedAssessments ?? 0
          }
          activeAssessments={
            assessmentSummary?.activeAssessments ?? 0
          }
          subjectId={subjectId}
        />
      </div>
    </PageContainer>
  );
}
