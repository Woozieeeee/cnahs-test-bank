"use client";

import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import EmptyState from "@/components/common/states/emptyState";

import useFacultySubjects from "@/hooks/faculty/subjects/useFacultySubjects";

import FacultySubjectsHeader from "@/components/faculty/subjects/facultySubjectsHeader";
import FacultySubjectsStats from "@/components/faculty/subjects/facultySubjectsStats";
import FacultySubjectCard from "@/components/faculty/subjects/facultySubjectCard";

export default function FacultySubjectsPage() {
  const { subjects, loading, error, refresh } =
    useFacultySubjects();

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading subjects..."
          description="Please wait while we retrieve your assigned subjects."
        />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load subjects."
          description={error}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  if (!subjects.length) {
    return (
      <PageContainer>
        <EmptyState
          title="No subjects assigned"
          description="You have not been assigned to any subjects yet."
        />
      </PageContainer>
    );
  }

  const totalSections = subjects.reduce(
    (sum, subject) => sum + subject.totalSections,
    0
  );

  const totalStudents = subjects.reduce(
    (sum, subject) => sum + subject.totalStudents,
    0
  );

  const totalQuestions = subjects.reduce(
    (sum, subject) => sum + subject.totalQuestions,
    0
  );

  return (
    <PageContainer>
      <FacultySubjectsHeader />

      <FacultySubjectsStats
        totalSubjects={subjects.length}
        totalSections={totalSections}
        totalStudents={totalStudents}
        totalQuestions={totalQuestions}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
          <FacultySubjectCard
            key={subject.id}
            subject={subject}
          />
        ))}
      </div>
    </PageContainer>
  );
}
