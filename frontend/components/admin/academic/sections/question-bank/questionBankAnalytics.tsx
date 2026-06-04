"use client";

import { memo } from "react";

import QuestionDifficultyChart from "./questionDifficultyChart";

import QuestionWeakTopicsChart from "./questionWeakTopicsChart";

interface Props {
  analytics: {
    distribution: {
      easy: number;
      medium: number;
      hard: number;
      expert: number;
    };

    weakestTopics: {
      topic: string;
      score: number;
    }[];
  };
}

function QuestionBankAnalytics({ analytics }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Question Analytics
        </h2>

        <p className="text-muted-foreground text-sm">
          Difficulty distribution and weakest-performing
          topics.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="border-border bg-card rounded-2xl border p-6">
          <h3 className="mb-4 font-semibold">
            Difficulty Distribution
          </h3>

          <QuestionDifficultyChart
            distribution={analytics.distribution}
          />
        </div>

        <div className="border-border bg-card rounded-2xl border p-6">
          <h3 className="mb-4 font-semibold">
            Weakest Topics
          </h3>

          <QuestionWeakTopicsChart
            topics={analytics.weakestTopics}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(QuestionBankAnalytics);
