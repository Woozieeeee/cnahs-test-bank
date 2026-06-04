"use client";

import { memo } from "react";

interface Props {
  average: number;

  passingRate: number;

  expertReady: number;

  atRisk: number;
}

function SubjectReadinessAnalytics({
  average,
  passingRate,
  expertReady,
  atRisk,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <div>
        <h2 className="text-lg font-semibold">
          Board Readiness Analytics
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Overall student readiness and performance.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <StatCard label="Average" value={`${average}%`} />

        <StatCard
          label="Passing Rate"
          value={`${passingRate}%`}
        />

        <StatCard
          label="Expert Ready"
          value={expertReady}
        />

        <StatCard label="At Risk" value={atRisk} />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-4 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default memo(SubjectReadinessAnalytics);
