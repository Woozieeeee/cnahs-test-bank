"use client";

import { memo } from "react";

interface Props {
  averageScore: number;
  passingRate: number;
  highestScore: number;
  lowestScore: number;
}

function AssessmentDetailsStats({
  averageScore,
  passingRate,
  highestScore,
  lowestScore,
}: Props) {
  const stats = [
    {
      label: "Average Score",
      value: `${averageScore}%`,
    },
    {
      label: "Passing Rate",
      value: `${passingRate}%`,
    },
    {
      label: "Highest Score",
      value: `${highestScore}%`,
    },
    {
      label: "Lowest Score",
      value: `${lowestScore}%`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-border bg-card rounded-2xl border p-5"
        >
          <p className="text-muted-foreground text-sm">
            {stat.label}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default memo(AssessmentDetailsStats);
