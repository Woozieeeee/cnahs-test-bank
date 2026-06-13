"use client";

import { memo } from "react";

import type { Assessment } from "@/types/assessments/assessment";

interface Props {
  assessment: Assessment;

  onEdit: () => void;

  onArchive: () => void;

  onRestore: () => void;

  onCancel: () => void;

  isArchiving: boolean;

  isRestoring: boolean;

  isCancelling: boolean;
}

function AssessmentCardMenu({
  assessment,
  onEdit,
  onArchive,
  onRestore,
  onCancel,
  isArchiving,
  isRestoring,
  isCancelling,
}: Props) {
  return (
    <div className="bg-popover border-border absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border shadow-md">
      <div className="p-1">
        <button
          onClick={onEdit}
          className="hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm"
        >
          Edit
        </button>

        {assessment.status === "SCHEDULED" && (
          <button
            onClick={onCancel}
            disabled={isCancelling}
            className="w-full rounded-md px-3 py-2 text-left text-sm text-orange-600 hover:bg-orange-100"
          >
            {isCancelling ? "Cancelling..." : "Cancel Exam"}
          </button>
        )}

        {assessment.status !== "ARCHIVED" && (
          <button
            onClick={onArchive}
            disabled={
              isArchiving || assessment.status === "ONGOING"
            }
            className="text-destructive hover:bg-destructive/10 w-full rounded-md px-3 py-2 text-left text-sm"
          >
            {isArchiving ? "Archiving..." : "Archive"}
          </button>
        )}

        {(assessment.status === "ARCHIVED" ||
          assessment.status === "CANCELLED") && (
          <button
            onClick={onRestore}
            disabled={isRestoring}
            className="hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm"
          >
            {isRestoring ? "Restoring..." : "Restore"}
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(AssessmentCardMenu);
