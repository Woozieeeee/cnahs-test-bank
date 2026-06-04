"use client";

import { memo } from "react";

import MotionButton from "@/components/motion/motionButton";

interface Props {
  submitLabel?: string;

  cancelLabel?: string;

  submitDisabled?: boolean;

  cancelDisabled?: boolean;

  onSubmit: () => void;

  onCancel: () => void;
}

function ModalActions({
  submitLabel = "Save",

  cancelLabel = "Cancel",

  submitDisabled,

  cancelDisabled,

  onSubmit,

  onCancel,
}: Props) {
  return (
    <div className="mt-6 flex justify-end gap-3">
      <MotionButton
        onClick={onCancel}
        disabled={cancelDisabled}
        className="border-border bg-card text-muted-foreground rounded-xl border px-4 py-2 text-sm font-medium"
      >
        {cancelLabel}
      </MotionButton>

      <MotionButton
        onClick={onSubmit}
        disabled={submitDisabled}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitLabel}
      </MotionButton>
    </div>
  );
}

export default memo(ModalActions);
