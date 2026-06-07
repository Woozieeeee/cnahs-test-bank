"use client";

import { memo } from "react";

import type { CreateExamRules } from "@/types/exams/createExamRules";

interface Props {
  rules: CreateExamRules;
}

function SecuritySummaryCard({ rules }: Props) {
  const enabledProtections = [
    rules.requireFullscreen && "Fullscreen Required",
    rules.detectTabSwitch && "Tab Switch Detection",
    rules.detectWindowBlur && "Window Focus Detection",
    rules.blockCopy && "Copy Protection",
    rules.blockPaste && "Paste Protection",
    rules.blockRightClick && "Right Click Protection",
    rules.detectDeviceChange && "Device Change Detection",
  ].filter((item): item is string => Boolean(item));

  return (
    <div className="border-border bg-card sticky top-0 rounded-2xl border p-5">
      <h3 className="font-semibold">Security Summary</h3>

      <p className="text-muted-foreground mt-1 text-sm">
        Active monitoring and protection settings.
      </p>

      <div className="mt-5 space-y-2">
        {enabledProtections.map((item) => (
          <div
            key={item}
            className="rounded-lg border p-3 text-sm"
          >
            ✓ {item}
          </div>
        ))}
      </div>

      <div className="border-border mt-5 border-t pt-5">
        <div className="mb-3">
          <p className="text-muted-foreground text-xs">
            Violation Threshold
          </p>

          <p className="font-medium">
            {rules.violationThreshold}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs">
            Action
          </p>

          <p className="font-medium">
            {rules.thresholdAction
              .replaceAll("_", " ")
              .toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(SecuritySummaryCard);
