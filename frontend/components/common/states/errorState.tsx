"use client";

import { memo } from "react";

import MotionButton from "@/components/motion/motionButton";

interface Props {
  title?: string;

  description?: string;

  onRetry?: () => void;
}

function ErrorState({
  title = "Something went wrong.",
  description,
  onRetry,
}: Props) {
  return (
    <div className="bg-card rounded-2xl border border-red-200 p-10 text-center">
      <h2 className="text-lg font-semibold text-red-600">
        {title}
      </h2>

      {description && (
        <p className="text-muted-foreground mt-2">
          {description}
        </p>
      )}

      {onRetry && (
        <MotionButton
          onClick={onRetry}
          className="bg-primary text-primary-foreground mt-5 rounded-xl px-4 py-2"
        >
          Retry
        </MotionButton>
      )}
    </div>
  );
}

export default memo(ErrorState);
