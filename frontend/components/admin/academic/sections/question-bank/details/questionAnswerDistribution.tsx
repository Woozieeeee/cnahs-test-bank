"use client";

import { memo } from "react";

interface AnswerChoice {
  choice: string;

  answer: string;

  count: number;

  correct: boolean;
}

interface Props {
  answers: AnswerChoice[];
}

function QuestionAnswerDistribution({ answers }: Props) {
  const totalResponses = answers.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const mostSelectedWrong = answers
    .filter((item) => !item.correct)
    .sort((a, b) => b.count - a.count)[0];

  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <div>
        <h2 className="text-lg font-semibold">
          Answer Distribution
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Analyze answer selections and identify common
          misconceptions.
        </p>
      </div>

      {/* SUMMARY */}

      <div className="mt-6 grid grid-cols-2 gap-3">
        <MiniStat
          label="Responses"
          value={totalResponses}
        />

        <MiniStat
          label="Top Mistake"
          value={mostSelectedWrong?.choice ?? "-"}
        />
      </div>

      {/* ANSWERS */}

      <div className="mt-6 space-y-3">
        {answers.map((answer) => {
          const percentage = Math.round(
            (answer.count / totalResponses) * 100
          );

          return (
            <div
              key={answer.choice}
              className={`rounded-xl border p-4 ${
                answer.correct
                  ? `border-green-500/30 bg-green-500/10`
                  : `border-red-500/30 bg-red-500/10`
              } `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-semibold">
                      {answer.choice}. {answer.answer}
                    </p>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        answer.correct
                          ? `bg-green-100 text-green-700`
                          : `bg-red-100 text-red-700`
                      } `}
                    >
                      {answer.correct
                        ? "CORRECT"
                        : "INCORRECT"}
                    </span>
                  </div>
                </div>

                <div
                  className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                    answer.correct
                      ? `bg-green-100 text-green-700`
                      : `bg-red-100 text-red-700`
                  } `}
                >
                  {percentage}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-3">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

export default memo(QuestionAnswerDistribution);
