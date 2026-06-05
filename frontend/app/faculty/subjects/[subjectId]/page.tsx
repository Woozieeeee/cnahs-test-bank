"use client";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import NotFoundState from "@/components/common/states/notFoundState";
import FacultyAssessmentPreview from "@/components/faculty/subjects/details/facultyAssessmentPreview";
import FacultyQuestionBankPreview from "@/components/faculty/subjects/details/facultyQuestionBankPreview";
import FacultyTopicsPreview from "@/components/faculty/subjects/details/facultyTopicsPreview";

import useFacultySubject from "@/hooks/faculty/subjects/useFacultySubject";

import FacultySubjectHeader from "@/components/faculty/subjects/details/facultySubjectHeader";

import FacultySubjectStats from "@/components/faculty/subjects/details/facultySubjectStats";

export default function FacultySubjectPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { subject, loading, error, refresh } =
    useFacultySubject(subjectId);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading subject..."
          description="Please wait while we retrieve subject information."
        />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load subject."
          description={error}
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
          description="The requested subject could not be found."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href="/faculty/subjects"
        label="Back to Subjects"
      />

      <FacultySubjectHeader
        code={subject.code}
        name={subject.name}
        description={subject.description}
      />

      <FacultySubjectStats
        totalTopics={subject.totalTopics}
        totalQuestions={subject.totalQuestions}
        totalAssessments={subject.totalAssessments}
        totalStudents={subject.totalStudents}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <FacultyTopicsPreview
          subjectId={subject.id}
          totalTopics={subject.totalTopics}
          totalQuestions={subject.totalQuestions}
          totalAssessments={subject.totalAssessments}
        />

        <FacultyQuestionBankPreview
          subjectId={subject.id}
          totalQuestions={subject.totalQuestions}
          totalTopics={subject.totalTopics}
          weakQuestions={0}
          averageSuccessRate={0}
        />
        <FacultyAssessmentPreview
          subjectId={subject.id}
          totalAssessments={subject.totalAssessments}
        />
      </div>
    </PageContainer>
  );
}
