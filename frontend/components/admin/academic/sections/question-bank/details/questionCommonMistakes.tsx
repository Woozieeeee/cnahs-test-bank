"use client";

import { memo } from "react";

interface Mistake {
  choice: string;

  count: number;

  explanation: string;
}

interface Summary {
  topWrongChoice: string;

  studentsAffected: number;

  misconceptionRate: number;

  impact: string;
}
interface Props {
  summary: Summary;

  mistakes: Mistake[];
}

function QuestionCommonMistakes({ mistakes }: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">
        Common Mistakes
      </h2>

      <div className="mt-6 space-y-4">
        {mistakes.map((mistake) => (
          <div
            key={mistake.choice}
            className="border-border rounded-xl border p-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium">
                {mistake.choice}
              </h4>

              <span className="text-sm font-semibold text-red-600">
                {mistake.count} students
              </span>
            </div>

            <p className="text-muted-foreground mt-2 text-sm">
              {mistake.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(QuestionCommonMistakes);
