"use client";
import { memo, useMemo } from "react";

interface Props {
  distribution: {
    EASY: number;
    MEDIUM: number;
    HARD: number;
    EXPERT: number;
  };
}

function DifficultyDistribution({ distribution }: Props) {
  const total =
    distribution.EASY +
    distribution.MEDIUM +
    distribution.HARD +
    distribution.EXPERT;

  const rows = useMemo(
    () => [
      {
        label: "Easy",
        value: distribution.EASY,
      },
      {
        label: "Medium",
        value: distribution.MEDIUM,
      },
      {
        label: "Hard",
        value: distribution.HARD,
      },
      {
        label: "Expert",
        value: distribution.EXPERT,
      },
    ],
    [distribution]
  );

  return (
    <div className="border-border bg-card mt-6 rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">
        Difficulty Distribution
      </h2>

      <p className="text-muted-foreground mt-1 text-sm">
        Distribution of questions by difficulty.
      </p>

      <div className="mt-6 space-y-4">
        {rows.map((row) => {
          const percentage =
            total === 0
              ? 0
              : Math.round((row.value / total) * 100);

          return (
            <div key={row.label}>
              <div className="mb-2 flex justify-between text-sm">
                <span>{row.label}</span>

                <span>
                  {row.value} ({percentage}%)
                </span>
              </div>

              <div className="bg-muted h-3 rounded-full">
                <div
                  className="bg-primary h-3 rounded-full transition-all"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default memo(DifficultyDistribution);
