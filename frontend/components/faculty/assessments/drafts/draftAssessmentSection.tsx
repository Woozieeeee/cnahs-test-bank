"use client";

import DraftAssessmentCard from "./draftAssessmentCard";

import type { ExamDraft } from "@/types/exams/examDraft";

interface Props {
  draft: ExamDraft;

  onContinue: () => void;
}

export default function DraftAssessmentSection({
  draft,
  onContinue,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">
          Draft Assessment
        </h2>

        <p className="text-muted-foreground text-sm">
          Continue building your unfinished exam.
        </p>
      </div>

      <DraftAssessmentCard
        draft={draft}
        onContinue={onContinue}
      />
    </div>
  );
}
