import { useEffect, useRef } from "react";
import type { ExamConfig } from "@/types/exams/examSession";

interface UseThresholdEnforcementProps {
  enabled: boolean;
  totalViolations: number;
  config: ExamConfig;
  onThresholdReached: (action: string) => void;
}

export function useThresholdEnforcement({
  enabled,
  totalViolations,
  config,
  onThresholdReached,
}: UseThresholdEnforcementProps) {
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (!enabled || triggeredRef.current) return;

    if (totalViolations >= config.violationThreshold) {
      triggeredRef.current = true;
      console.warn(
        "Violation threshold reached locally. Action:",
        config.thresholdAction,
      );
      onThresholdReached(config.thresholdAction);
    }
  }, [totalViolations, config, enabled, onThresholdReached]);
}
