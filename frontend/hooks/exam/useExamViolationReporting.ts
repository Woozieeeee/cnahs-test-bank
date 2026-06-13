"use client";

import { useCallback, useRef } from "react";
import { recordExamViolation } from "@/services/exam_violation_service";
import type { ExamViolation } from "@/types/exams/examSession";

interface Options {
  onThresholdReached?: (action: string) => void;
}

export function useExamViolationReporting(examId?: string, options?: Options) {
  const inFlightRef = useRef<Set<string>>(new Set());

  const reportViolation = useCallback(
    (violation: ExamViolation) => {
      if (!examId) return;

      const dedupeKey = `${violation.type}`;
      if (inFlightRef.current.has(dedupeKey)) return;

      inFlightRef.current.add(dedupeKey);

      void recordExamViolation(examId, {
        type: violation.type,
        description: violation.description,
        severity: violation.severity,
      })
        .then((result) => {
          if (result?.thresholdCrossed && result.thresholdAction) {
            options?.onThresholdReached?.(result.thresholdAction);
          }
        })
        .catch((error) => {
          console.error("Failed to report exam violation:", error);
        })
        .finally(() => {
          setTimeout(() => {
            inFlightRef.current.delete(dedupeKey);
          }, 5000);
        });
    },
    [examId, options?.onThresholdReached],
  );

  return { reportViolation };
}
