"use client";

import { useMemo } from "react";

import { useParams } from "next/navigation";

import useSectionId from "@/hooks/useSectionId";
import useSection from "@/hooks/useSection";

import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import NotFoundState from "@/components/common/states/notFoundState";

import { mockSectionSubjects } from "@/components/admin/academic/sections/data/mockSectionSubjects";

import SubjectAssessmentsHeader from "@/components/admin/academic/sections/subjects/assessment/subjectAssessmentsHeader";

import SubjectAssessmentsStats from "@/components/admin/academic/sections/subjects/assessment/subjectAssessmentsStats";

import SubjectAssessmentsAnalytics from "@/components/admin/academic/sections/subjects/assessment/subjectAssessmentsAnalytics";

import SubjectAssessmentsList from "@/components/admin/academic/sections/subjects/assessment/subjectAssessmentsList";

import { mockSubjectAssessments } from "@/components/admin/academic/sections/data/mockSubjectAssessments";

import { mockAssessmentAnalytics } from "@/components/admin/academic/sections/data/mockAssessmentAnalytics";

export default function SubjectAssessmentsPage() {
  const sectionId = useSectionId();

  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { section, loading, error, refresh } =
    useSection(sectionId);

  // =========================
  // SUBJECT
  // =========================

  const sectionSubject = useMemo(() => {
    if (!section) return null;

    const found = section.sectionSubjects.find(
      (item) => item.subject.id === subjectId
    );

    if (found) return found;

    return mockSectionSubjects.find(
      (item) => item.subject.id === subjectId
    );
  }, [section, subjectId]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
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

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load assessments."
          description={error}
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
        totalAssessments={mockSubjectAssessments.length}
        ongoingAssessments={2}
        passRate={82}
        totalViolations={14}
      />

      {/* ANALYTICS */}

      <SubjectAssessmentsAnalytics
        analytics={mockAssessmentAnalytics}
      />

      {/* ASSESSMENTS */}

      <SubjectAssessmentsList
        sectionId={sectionId}
        subjectId={subject.id}
        assessments={mockSubjectAssessments}
      />
    </PageContainer>
  );
}
