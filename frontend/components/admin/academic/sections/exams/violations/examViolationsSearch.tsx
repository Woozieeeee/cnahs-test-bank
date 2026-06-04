"use client";

import { memo } from "react";

interface Props {
  value: string;

  onChange: (value: string) => void;
}

function ExamViolationsSearch({ value, onChange }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search student, ID, or violation..."
      className="border-border bg-background focus:ring-primary w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:outline-none"
    />
  );
}

export default memo(ExamViolationsSearch);
