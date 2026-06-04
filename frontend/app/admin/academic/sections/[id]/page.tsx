"use client";

import useSectionId from "@/hooks/useSectionId";

import useSection from "@/hooks/useSection";

import PageContainer from "@/components/layout/pages/pageContainer";

import LoadingState from "@/components/common/states/loadingState";

import ErrorState from "@/components/common/states/errorState";

import NotFoundState from "@/components/common/states/notFoundState";

import SectionDetailsHeader from "@/components/admin/academic/sections/details/sectionDetailsHeader";

import SectionSubjectsPreview from "@/components/admin/academic/sections/details/sectionSubjectsPreview";

import SectionStudentsPreview from "@/components/admin/academic/sections/details/sectionStudentsPreview";

import SectionQuestionBankPreview from "@/components/admin/academic/sections/details/sectionQuestionBankPreview";

import SectionExamsPreview from "@/components/admin/academic/sections/details/sectionExamsPreview";

export default function SectionDetailsPage() {
  const id = useSectionId();

  const { section, loading, error, refresh } =
    useSection(id);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading section..."
          description="Please wait while we retrieve section information."
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
          title="Failed to load section."
          description={error}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  // =========================
  // NOT FOUND
  // =========================

  if (!section) {
    return (
      <PageContainer>
        <NotFoundState
          title="Section not found."
          description="The requested section may have been removed or is no longer available."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionDetailsHeader section={section} />

      {/* OVERVIEW */}

      <div className="space-y-3">
        <div>
          <h2 className="text-foreground text-lg font-semibold">
            Academic Resources
          </h2>

          <p className="text-muted-foreground text-sm">
            Manage subjects, students, and examinations
            assigned to this section.
          </p>
        </div>

        <div className="grid items-stretch gap-6 xl:grid-cols-4">
          <SectionSubjectsPreview section={section} />

          <SectionStudentsPreview section={section} />

          <SectionExamsPreview section={section} />

          <SectionQuestionBankPreview section={section} />
        </div>
      </div>
    </PageContainer>
  );
}
