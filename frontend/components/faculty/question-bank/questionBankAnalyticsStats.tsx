"use client";

import { useMemo, memo } from "react";

interface Props {
  totalQuestions: number;

  totalTopics: number;

  weakQuestions: number;

  averageSuccessRate: number;
}

function QuestionBankAnalyticsStats({
  totalQuestions,
  totalTopics,
  weakQuestions,
  averageSuccessRate,
}: Props) {
  const cards = useMemo(
    () => [
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
        label: "Success Rate",
        value: `${averageSuccessRate}%`,
      },
    ],
    [
      totalQuestions,
      totalTopics,
      weakQuestions,
      averageSuccessRate,
    ]
  );

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="border-border bg-card rounded-2xl border p-5"
        >
          <p className="text-muted-foreground text-sm">
            {card.label}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default memo(QuestionBankAnalyticsStats);
