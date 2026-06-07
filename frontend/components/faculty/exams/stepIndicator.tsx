"use client";

import { memo } from "react";

interface Props {
  currentStep: number;
}

const steps = ["Questions", "Rules", "Schedule", "Review"];

function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        const completed = stepNumber < currentStep;

        const active = stepNumber === currentStep;

        return (
          <div
            key={step}
            className="flex flex-1 items-center"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  completed
                    ? "bg-primary text-primary-foreground"
                    : active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                }`}
              >
                {completed ? "✓" : stepNumber}
              </div>

              <span
                className={`text-sm font-medium ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="bg-border mx-3 h-px flex-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(StepIndicator);
