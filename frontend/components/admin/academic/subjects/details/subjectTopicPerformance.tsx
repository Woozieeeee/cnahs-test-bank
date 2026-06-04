"use client";

import { memo } from "react";

import SubjectWeakTopicsChart from "./subjectWeakTopicsChart";

interface Props {
  topics: {
    topic: string;
    score: number;
  }[];
}

function SubjectTopicPerformance({ topics }: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <div>
        <h2 className="text-lg font-semibold">
          Topic Performance
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Lowest performing topics across all sections.
        </p>
      </div>

      <div className="mt-6">
        <SubjectWeakTopicsChart topics={topics} />
      </div>
    </div>
  );
}

export default memo(SubjectTopicPerformance);
