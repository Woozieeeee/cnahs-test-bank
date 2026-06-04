"use client";

import { memo } from "react";

interface Props {
  totalQuestions: number;
  totalTopics: number;
  weakQuestions: number;
  averageSuccessRate: number;
}

function QuestionBankStats({
  totalQuestions,
  totalTopics,
  weakQuestions,
  averageSuccessRate,
}: Props) {
  const stats = [
    {
      label: "Questions",
      value: totalQuestions,
    },
    {
      label: "Topics",
      value: totalTopics,
    },
    {
      label: "Weak Questions",
      value: weakQuestions,
    },
    {
      label: "Avg Success",
      value: `${averageSuccessRate}%`,
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

export default memo(QuestionBankStats);
