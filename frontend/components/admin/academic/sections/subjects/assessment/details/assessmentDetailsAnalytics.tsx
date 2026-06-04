"use client";

import { memo } from "react";

import AssessmentDetailsProgressChart from "./assessmentDetailsProgressChart";

import AssessmentDetailsDistributionChart from "./assessmentDetailsDistributionChart";

interface Props {
  progression: {
    easy: number;
    medium: number;
    hard: number;
    expert: number;
  };

  distribution: {
    excellent: number;
    good: number;
    average: number;
    belowAverage: number;
    failed: number;
  };
}

function AssessmentDetailsAnalytics({
  progression,
  distribution,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Assessment Analytics
        </h2>

        <p className="text-muted-foreground text-sm">
          Student progression and score distribution
          overview.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="border-border bg-card rounded-2xl border p-6">
          <h3 className="mb-4 font-semibold">
            Difficulty Progression
          </h3>

          <AssessmentDetailsProgressChart
            progression={progression}
          />
        </div>

        <div className="border-border bg-card rounded-2xl border p-6">
          <h3 className="mb-4 font-semibold">
            Score Distribution
          </h3>

          <AssessmentDetailsDistributionChart
            distribution={distribution}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(AssessmentDetailsAnalytics);
