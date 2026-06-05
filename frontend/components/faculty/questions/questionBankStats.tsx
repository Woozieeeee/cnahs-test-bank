"use client";

import { memo } from "react";

interface Props {
  total: number;

  easy: number;

  medium: number;

  hard: number;

  expert: number;
}

interface StatCardProps {
  label: string;

  value: number;
}

const StatCard = memo(function StatCard({
  label,
  value,
}: StatCardProps) {
  return (
    <div className="border-border bg-card rounded-2xl border p-5">
      <p className="text-muted-foreground text-sm">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
});

function QuestionBankStats({
  total,
  easy,
  medium,
  hard,
  expert,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <StatCard label="Questions" value={total} />

      <StatCard label="Easy" value={easy} />

      <StatCard label="Medium" value={medium} />

      <StatCard label="Hard" value={hard} />

      <StatCard label="Expert" value={expert} />
    </div>
  );
}

export default memo(QuestionBankStats);
