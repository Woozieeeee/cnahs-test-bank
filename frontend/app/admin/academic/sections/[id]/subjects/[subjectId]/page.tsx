"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import useSectionId from "@/hooks/shared/useSectionId";
import useSection from "@/hooks/academic/useSection";

import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import NotFoundState from "@/components/common/states/notFoundState";

import SubjectDetailsHeader from "@/components/admin/academic/sections/subjects/details/subjectDetailsHeader";

import SubjectHeroCard from "@/components/admin/academic/sections/subjects/details/subjectHeroCard";
import SubjectStatsGrid from "@/components/admin/academic/sections/subjects/details/subjectStatsGrid";
import SubjectFacultyCard from "@/components/admin/academic/sections/subjects/details/subjectFacultyCard";
import SubjectStudentDistributionCard from "@/components/admin/academic/sections/subjects/details/subjectStudentDistributionCard";
import SubjectQuickAccessSection from "@/components/admin/academic/sections/subjects/details/subjectQuickAccessSection";

import { mockSectionSubjects } from "@/components/admin/academic/sections/data/mockSectionSubjects";
import { mockSubjectDashboard } from "@/components/admin/academic/sections/data/mockSubjectDashboard";

export default function SubjectDetailsPage() {
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
          title="Loading subject..."
          description="Please wait while we retrieve subject information."
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
          title="Failed to load subject."
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
      <SubjectDetailsHeader
        sectionId={sectionId}
        subject={subject}
      />

      <SubjectHeroCard subject={subject} />

      <SubjectStatsGrid
        averageScore={mockSubjectDashboard.averageRating}
        passingRate={mockSubjectDashboard.passingRate}
        highestScore={98}
        lowestScore={61}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <SubjectFacultyCard subject={subject} />

        <SubjectStudentDistributionCard
          regular={42}
          irregular={5}
        />
      </div>

      <SubjectQuickAccessSection
        sectionId={sectionId}
        subjectId={subject.id}
      />
    </PageContainer>
  );
}
