"use client";

import { memo } from "react";

interface Props {
  total: number;

  draft: number;

  scheduled: number;

  ongoing: number;

  completed: number;
}

const StatCard = memo(function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="border-border bg-card rounded-2xl border p-5">
      <p className="text-muted-foreground text-sm">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
});

function AssessmentStats({
  total,
  draft,
  scheduled,
  ongoing,
  completed,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard label="Assessments" value={total} />

      <StatCard label="Scheduled" value={scheduled} />

      <StatCard label="Ongoing" value={ongoing} />

      <StatCard label="Completed" value={completed} />
    </div>
  );
}

export default memo(AssessmentStats);
