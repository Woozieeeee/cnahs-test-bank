"use client";

import { memo } from "react";

import type { ExamViolation } from "@/types/assessments/examViolation";

import ExamViolationTimelineItem from "./examViolationTimelineItem";

interface Props {
  violations: ExamViolation[];

  onSelectViolation: (violation: ExamViolation) => void;
}

function ExamViolationTimeline({
  violations,
  onSelectViolation,
}: Props) {
  return (
    <div className="space-y-6">
      {violations.map((violation, index) => (
        <ExamViolationTimelineItem
          key={violation.id}
          violation={violation}
          isLast={index === violations.length - 1}
          onClick={onSelectViolation}
        />
      ))}
    </div>
  );
}

export default memo(ExamViolationTimeline);
