"use client";

import { memo } from "react";
import Link from "next/link";

interface Props {
  subjectId: number;

  totalQuestions: number;

  totalTopics: number;

  weakQuestions: number;

  averageSuccessRate: number;
}

function SubjectQuestionBankSummary({
  totalQuestions,
  totalTopics,
  weakQuestions,
  averageSuccessRate,
  subjectId,
}: Props) {
  return (
    <Link
      href={`/admin/academic/subjects/${subjectId}/question-bank`}
      className="block h-full"
    >
      <div className="border-border bg-card hover:border-ring flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">
            Question Bank
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            Question quality and topic coverage.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <MetricCard
            label="Questions"
            value={totalQuestions}
          />

          <MetricCard label="Topics" value={totalTopics} />

          <MetricCard
            label="Weak Questions"
            value={weakQuestions}
          />

          <MetricCard
            label="Avg Success"
            value={`${averageSuccessRate}%`}
          />
        </div>

        <div className="text-primary mt-auto flex items-center justify-between pt-6 text-sm font-medium">
          <span>View Question Bank</span>

          <span>→</span>
        </div>
      </div>
    </Link>
  );
}

function MetricCard({
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

      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

export default memo(SubjectQuestionBankSummary);
