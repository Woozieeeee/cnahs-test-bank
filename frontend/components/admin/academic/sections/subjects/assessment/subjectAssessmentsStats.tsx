"use client";

import { memo } from "react";

interface Props {
  totalAssessments: number;

  ongoingAssessments: number;

  passRate: number;

  totalViolations: number;
}

function SubjectAssessmentsStats({
  totalAssessments,
  ongoingAssessments,
  passRate,
  totalViolations,
}: Props) {
  const stats = [
    {
      label: "Assessments",

      value: totalAssessments,
    },

    {
      label: "Ongoing",

      value: ongoingAssessments,
    },

    {
      label: "Pass Rate",

      value: `${passRate}%`,
    },

    {
      label: "Violations",

      value: totalViolations,
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

export default memo(SubjectAssessmentsStats);
