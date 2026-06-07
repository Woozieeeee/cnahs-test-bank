"use client";

import MotionCard from "@/components/motion/motionCard";

import DraftAssessmentCardHeader from "./draftAssessmentCardHeader";

import { getDraftStepLabel } from "@/lib/exams/getDraftStepLabel";

import type { ExamDraft } from "@/types/exams/examDraft";

interface Props {
  draft: ExamDraft;

  onContinue: () => void;
}

export default function DraftAssessmentCard({
  draft,
  onContinue,
}: Props) {
  return (
    <MotionCard>
      <div className="border-border hover:border-ring flex h-full flex-col rounded-2xl border p-6 transition-all">
        <DraftAssessmentCardHeader title={draft.title} />

        <div className="mt-4 flex flex-1 flex-col">
          <p className="text-muted-foreground text-sm">
            Last Updated
          </p>

          <p className="mt-1 text-sm font-medium">
            {new Date(draft.updatedAt).toLocaleString()}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricCard
              label="Current Step"
              value={getDraftStepLabel(draft.currentStep)}
            />

            <MetricCard label="Status" value="Draft" />
          </div>

          <button
            onClick={onContinue}
            className="text-primary mt-auto pt-5 text-left text-sm font-medium"
          >
            Continue Draft →
          </button>
        </div>
      </div>
    </MotionCard>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-4 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold">{value}</p>
    </div>
  );
}
