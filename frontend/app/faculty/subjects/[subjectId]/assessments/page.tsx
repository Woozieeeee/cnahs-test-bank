"use client";

import { useMemo, useState } from "react";

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import EmptyState from "@/components/common/states/emptyState";

import useSubjectAssessments from "@/hooks/faculty/subjects/useSubjectAssessments";
import useExamCreationFlow from "@/hooks/exams/useExamCreationFlow";

import AssessmentHeader from "@/components/faculty/assessments/assessmentHeader";
import AssessmentStats from "@/components/faculty/assessments/assessmentStats";
import AssessmentStatusTabs from "@/components/faculty/assessments/assessmentStatusTabs";
import AssessmentFilters from "@/components/faculty/assessments/assessmentFilters";
import AssessmentCard from "@/components/faculty/assessments/assessmentCard";

import CreateExamSetupModal from "@/components/faculty/exams/modal/createExamSetupModal";
import CreateExamWizardModal from "@/components/faculty/exams/modal/createExamWizardModal";
import DraftRecoveryModal from "@/components/faculty/exams/modal/draftRecoveryModal";

export default function FacultySubjectAssessmentsPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { data, loading, error, refresh } =
    useSubjectAssessments(subjectId);

  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState<
    | "ALL"
    | "DRAFT"
    | "SCHEDULED"
    | "ONGOING"
    | "COMPLETED"
    | "ARCHIVED"
  >("ALL");

  const [sectionId, setSectionId] = useState("ALL");

  const {
    draft,
    refreshDraft,

    showSetupModal,
    showWizardModal,
    showDraftRecoveryModal,

    examSetup,
    activeDraft,

    handleCreateExam,

    closeSetup,

    startWizard,

    closeWizard,
    cancelWizard,

    handleContinueDraft,

    handleStartNewExam,

    closeDraftRecovery,

    isDeletingDraft,
    wizardInstance,

    handleResumeDraft,
  } = useExamCreationFlow(subjectId);

  const filteredAssessments = useMemo(() => {
    if (!data) {
      return [];
    }

    let result = [...data.assessments];

    if (search.trim()) {
      result = result.filter((assessment) =>
        assessment.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (activeTab !== "ALL") {
      result = result.filter(
        (assessment) => assessment.status === activeTab
      );
    }

    if (sectionId !== "ALL") {
      result = result.filter(
        (assessment) =>
          assessment.section.id === Number(sectionId)
      );
    }

    return result;
  }, [data, search, activeTab, sectionId]);

  const allItems = useMemo(() => {
    const items = [...filteredAssessments];

    if (
      draft &&
      (activeTab === "ALL" || activeTab === "DRAFT")
    ) {
      items.unshift({
        id: draft.id,
        isDraft: true,
        draft,
      } as any);
    }

    return items;
  }, [filteredAssessments, draft, activeTab]);

  const stats = useMemo(() => {
    if (!data) {
      return {
        total: 0,
        draft: 0,
        scheduled: 0,
        ongoing: 0,
        completed: 0,
      };
    }

    return {
      total: data.assessments.length,

      draft: data.assessments.filter(
        (assessment) => assessment.status === "DRAFT"
      ).length,

      scheduled: data.assessments.filter(
        (assessment) => assessment.status === "SCHEDULED"
      ).length,

      ongoing: data.assessments.filter(
        (assessment) => assessment.status === "ONGOING"
      ).length,

      completed: data.assessments.filter(
        (assessment) => assessment.status === "COMPLETED"
      ).length,
    };
  }, [data]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading assessments..."
          description="Please wait while we retrieve assessment data."
        />
      </PageContainer>
    );
  }

  if (error || !data) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load assessments."
          description={
            error || "Unable to retrieve assessment data."
          }
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/faculty/subjects/${subjectId}`}
        label="Back to Subject"
      />

      <AssessmentHeader onCreate={handleCreateExam} />

      <AssessmentStats
        total={stats.total}
        draft={stats.draft}
        scheduled={stats.scheduled}
        ongoing={stats.ongoing}
        completed={stats.completed}
      />

      <AssessmentStatusTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <AssessmentFilters
        search={search}
        setSearch={setSearch}
        sectionId={sectionId}
        setSectionId={setSectionId}
        sections={data.sections}
        assessments={data.assessments.map(
          (assessment) => assessment.title
        )}
      />

      {allItems.length === 0 ? (
        <EmptyState
          title="No assessments found"
          description="No assessments match the selected filters."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allItems.map((item: any) =>
            item.isDraft ? (
              <AssessmentCard
                key={`draft-${item.draft.id}`}
                draft={item.draft}
                onContinueDraft={handleResumeDraft}
              />
            ) : (
              <AssessmentCard
                key={item.id}
                assessment={item}
              />
            )
          )}
        </div>
      )}
      <CreateExamSetupModal
        open={showSetupModal}
        onClose={closeSetup}
        onContinue={startWizard}
      />

      {examSetup && (
        <CreateExamWizardModal
          key={wizardInstance}
          open={showWizardModal}
          onClose={closeWizard}
          onCancel={cancelWizard}
          subjectId={subjectId}
          draft={activeDraft}
          questionLimit={examSetup.questionLimit}
          examLevel={examSetup.examLevel}
          onDraftSaved={refreshDraft}
          onExamCreated={refresh}
        />
      )}
      {draft && (
        <DraftRecoveryModal
          open={showDraftRecoveryModal}
          draft={draft}
          onClose={closeDraftRecovery}
          onContinueDraft={handleContinueDraft}
          onStartNewExam={handleStartNewExam}
          isDeletingDraft={isDeletingDraft}
        />
      )}
    </PageContainer>
  );
}
