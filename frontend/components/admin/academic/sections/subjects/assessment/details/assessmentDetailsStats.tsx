"use client";

import { memo } from "react";

interface Props {
  averageScore: number;

  passRate: number;

  violations: number;

  expertReadyStudents: number;
}

function AssessmentDetailsStats({
  averageScore,
  passRate,
  violations,
  expertReadyStudents,
}: Props) {
  const stats = [
    {
      label: "Average",

      value: `${averageScore}%`,
    },

    {
      label: "Pass Rate",

      value: `${passRate}%`,
    },

    {
      label: "Violations",

      value: violations,
    },

    {
      label: "Expert Ready",

      value: expertReadyStudents,
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

export default memo(AssessmentDetailsStats);
