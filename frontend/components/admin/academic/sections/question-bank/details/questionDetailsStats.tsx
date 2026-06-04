"use client";

import { memo } from "react";

interface Props {
  successRate: number;

  attempts: number;

  assessmentsUsed: number;

  averageTime: string;
}

function QuestionDetailsStats({
  successRate,
  attempts,
  assessmentsUsed,
  averageTime,
}: Props) {
  const stats = [
    {
      label: "Success Rate",

      value: `${successRate}%`,
    },

    {
      label: "Attempts",

      value: attempts,
    },

    {
      label: "Assessments",

      value: assessmentsUsed,
    },

    {
      label: "Average Time",

      value: averageTime,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-border bg-card rounded-2xl border p-6"
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

export default memo(QuestionDetailsStats);
