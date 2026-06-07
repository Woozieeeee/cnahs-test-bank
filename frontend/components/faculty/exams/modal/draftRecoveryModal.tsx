"use client";

import ModalContainer from "@/components/common/modal/modalContainer";
import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";
import { memo } from "react";

import type { ExamDraft } from "@/types/exams/examDraft";

interface Props {
  open: boolean;

  draft: ExamDraft;

  onClose: () => void;

  loading?: boolean;

  onContinueDraft: () => void;

  onStartNewExam: () => void;

  isDeletingDraft?: boolean;
}

function DraftRecoveryModal({
  open,
  draft,
  onClose,
  loading,
  onContinueDraft,
  onStartNewExam,
  isDeletingDraft,
}: Props) {
  const stepLabels: Record<number, string> = {
    1: "Question Builder",
    2: "Exam Rules",
    3: "Exam Information",
    4: "Review & Publish",
  };

  const formattedUpdatedAt = new Date(
    draft.updatedAt
  ).toLocaleString();

  const questionCount =
    draft.draftData.selectedQuestions?.length || 0;

  const questionLimit = draft.draftData.questionLimit || 0;

  const examLevel = draft.draftData.examLevel || "EASY";

  return (
    <ModalContainer open={open} maxWidth="max-w-lg">
      <ModalHeader
        title="Draft Found"
        description="An unfinished exam draft already exists."
        onClose={onClose}
      />

      <div className="mt-6 rounded-xl border p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium">
              {draft.title || "Untitled Draft"}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              {stepLabels[draft.currentStep] ??
                `Step ${draft.currentStep}`}
            </p>
          </div>
          <span className="bg-muted rounded-full px-2 py-1 text-xs font-medium">
            {examLevel}
          </span>
        </div>

        <div className="border-border my-4 border-b" />

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-muted-foreground text-xs">
              Questions
            </p>
            <p className="mt-1 text-sm font-medium">
              {questionCount}
              {questionLimit > 0 && ` / ${questionLimit}`}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">
              Last Updated
            </p>
            <p className="mt-1 text-sm font-medium">
              {formattedUpdatedAt}
            </p>
          </div>
        </div>
      </div>

      <ModalActions
        loading={loading || isDeletingDraft}
        submitLabel="Continue Draft"
        cancelLabel="Start New"
        onSubmit={onContinueDraft}
        onCancel={onStartNewExam}
      />
    </ModalContainer>
  );
}
export default memo(DraftRecoveryModal);
