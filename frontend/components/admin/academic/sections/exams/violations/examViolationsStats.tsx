"use client";

import { memo } from "react";

interface Props {
  total: number;

  high: number;

  medium: number;

  low: number;
}

function ExamViolationsStats({
  total,
  high,
  medium,
  low,
}: Props) {
  const stats = [
    {
      label: "Total",
      value: total,
    },
    {
      label: "High",
      value: high,
    },
    {
      label: "Medium",
      value: medium,
    },
    {
      label: "Low",
      value: low,
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

export default memo(ExamViolationsStats);
