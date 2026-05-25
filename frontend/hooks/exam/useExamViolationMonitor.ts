"use client";

import { useEffect } from "react";

interface Props {
  onViolation: (
    violation: string,
    metadata?: Record<string, unknown>
  ) => void;
}

export default function useExamViolationMonitor({
  onViolation,
}: Props) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        onViolation("TAB_SWITCH", {
          timestamp: new Date().toISOString(),
        });
      }
    };

    window.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [onViolation]);
}
