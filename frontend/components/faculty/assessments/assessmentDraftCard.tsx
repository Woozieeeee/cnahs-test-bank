"use client";

import { memo } from "react";

import MotionCard from "@/components/motion/motionCard";

import AssessmentMetricCard from "./assessmentMetricCard";

import { getDraftStepLabel } from "@/lib/exams/getDraftStepLabel";

import type { ExamDraft } from "@/types/exams/examDraft";

interface Props {
  draft: ExamDraft;

  onContinueDraft?: () => void;
}

function AssessmentDraftCard({
  draft,
  onContinueDraft,
}: Props) {
  return (
    <MotionCard>
      <div className="border-border hover:border-ring flex h-full flex-col rounded-2xl border p-6 transition-all">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="line-clamp-2 text-lg font-semibold">
              {draft.title || "Untitled Draft"}
            </h3>

            <p className="text-muted-foreground mt-1 text-sm">
              Draft Assessment
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
            DRAFT
          </span>
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <p className="text-muted-foreground text-sm">
            Last Updated
          </p>

          <p className="mt-1 text-sm font-medium">
            {new Date(draft.updatedAt).toLocaleString()}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <AssessmentMetricCard
              label="Current Step"
              value={getDraftStepLabel(draft.currentStep)}
            />

            <AssessmentMetricCard
              label="Questions"
              value={
                draft.draftData.selectedQuestions?.length ||
                0
              }
            />
          </div>

          <button
            onClick={onContinueDraft}
            className="text-primary mt-auto pt-5 text-left text-sm font-medium"
          >
            Continue Draft →
          </button>
        </div>
      </div>
    </MotionCard>
  );
}

export default memo(AssessmentDraftCard);
