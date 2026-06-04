"use client";

import { memo } from "react";

interface Coverage {
  mocks: number;

  quizzes: number;

  midterms: number;

  finals: number;
}

interface Props {
  totalAssessments: number;

  averageSuccessRate: number;

  highestSuccessRate: number;

  lowestSuccessRate: number;

  mostUsedAssessment: string;

  coverage: Coverage;
}

function QuestionAssessmentPerformance({
  totalAssessments,
  averageSuccessRate,
  highestSuccessRate,
  lowestSuccessRate,
  mostUsedAssessment,
  coverage,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      {/* HEADER */}

      <div>
        <h2 className="text-lg font-semibold">
          Assessment Performance
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Assessment usage and performance trends.
        </p>
      </div>

      {/* STATS */}

      <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <MiniStat
          label="Used In"
          value={totalAssessments}
        />

        <MiniStat
          label="Avg Success"
          value={`${averageSuccessRate}%`}
        />

        <MiniStat
          label="Highest"
          value={`${highestSuccessRate}%`}
        />

        <MiniStat
          label="Lowest"
          value={`${lowestSuccessRate}%`}
        />
      </div>

      {/* MOST USED */}

      <div className="border-border bg-background mt-6 rounded-xl border p-4">
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          Most Used Assessment
        </p>

        <p className="text-foreground mt-2 font-semibold">
          {mostUsedAssessment}
        </p>
      </div>

      {/* COVERAGE */}

      <div className="mt-6">
        <h3 className="text-foreground text-sm font-semibold">
          Assessment Coverage
        </h3>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <MiniStat
            label="Mock Exams"
            value={coverage.mocks}
          />

          <MiniStat
            label="Quizzes"
            value={coverage.quizzes}
          />

          <MiniStat
            label="Midterms"
            value={coverage.midterms}
          />

          <MiniStat
            label="Finals"
            value={coverage.finals}
          />
        </div>
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

      <p className="text-foreground mt-1 text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}

export default memo(QuestionAssessmentPerformance);
