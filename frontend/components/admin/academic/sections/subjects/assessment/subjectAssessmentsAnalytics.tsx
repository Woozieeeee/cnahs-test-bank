"use client";

import { memo } from "react";

import SubjectAssessmentsProgressChart from "./subjectAssessmentsProgressChart";

import SubjectAssessmentsTrendChart from "./subjectAssessmentsTrendChart";

interface Props {
  analytics: {
    progression: {
      easy: number;
      medium: number;
      hard: number;
      expert: number;
    };

    trend: {
      label: string;
      score: number;
    }[];
  };
}

function SubjectAssessmentsAnalytics({ analytics }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Assessment Analytics
        </h2>

        <p className="text-muted-foreground text-sm">
          Performance trends and difficulty progression.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="border-border bg-card rounded-2xl border p-6">
          <h3 className="mb-4 font-semibold">
            Difficulty Progression
          </h3>

          <SubjectAssessmentsProgressChart
            progression={analytics.progression}
          />
        </div>

        <div className="border-border bg-card rounded-2xl border p-6">
          <h3 className="mb-4 font-semibold">
            Performance Trend
          </h3>

          <SubjectAssessmentsTrendChart
            trend={analytics.trend}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(SubjectAssessmentsAnalytics);
