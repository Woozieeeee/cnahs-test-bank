"use client";

import { memo } from "react";

import QuestionCorrectnessChart from "./questionCorrectnessChart";

import QuestionImpactChart from "./questionImpactChart";

interface Props {
  correct: number;

  incorrect: number;

  blockedStudents: {
    easy: number;
    medium: number;
    hard: number;
    expert: number;
  };
}

function QuestionDetailsAnalytics({
  correct,
  incorrect,
  blockedStudents,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Question Analytics
        </h2>

        <p className="text-muted-foreground text-sm">
          Performance impact and answer accuracy overview.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="border-border bg-card rounded-2xl border p-6">
          <h3 className="mb-4 font-semibold">
            Correct vs Incorrect
          </h3>

          <QuestionCorrectnessChart
            correct={correct}
            incorrect={incorrect}
          />
        </div>

        <div className="border-border bg-card rounded-2xl border p-6">
          <h3 className="mb-4 font-semibold">
            Progression Impact
          </h3>

          <QuestionImpactChart
            blockedStudents={blockedStudents}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(QuestionDetailsAnalytics);
