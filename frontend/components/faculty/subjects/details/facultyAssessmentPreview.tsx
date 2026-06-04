"use client";

import { memo } from "react";

import Link from "next/link";

interface Props {
  subjectId: number;

  totalAssessments: number;
}

function FacultyAssessmentPreview({
  subjectId,
  totalAssessments,
}: Props) {
  return (
    <Link
      href={`/faculty/subjects/${subjectId}/assessments`}
      className="block h-full"
    >
      <div className="border-border bg-card hover:border-ring flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">
            Assessments
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            Manage quizzes, mock exams, and assessment
            analytics.
          </p>
        </div>

        <div className="mt-6">
          <MetricCard
            label="Assessments"
            value={totalAssessments}
          />
        </div>

        <div className="text-primary mt-auto pt-6 text-sm font-medium">
          View Assessments →
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
  value: number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-4">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default memo(FacultyAssessmentPreview);
