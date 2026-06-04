"use client";

import { memo } from "react";
import Link from "next/link";

interface Props {
  totalAssessments: number;

  subjectId: number;

  averageScore: number;

  completedAssessments: number;

  activeAssessments: number;
}

function SubjectAssessmentSummary({
  totalAssessments,
  averageScore,
  completedAssessments,
  activeAssessments,
  subjectId,
}: Props) {
  return (
    <Link
      href={`/admin/academic/subjects/${subjectId}/assessments`}
      className="block h-full"
    >
      <div className="border-border bg-card hover:border-ring flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">
            Assessment Overview
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            Assessment performance across sections.
          </p>
        </div>

        <div className="mt-6 grid gap-3">
          <MetricCard
            label="Assessments"
            value={totalAssessments}
          />

          <MetricCard
            label="Average Score"
            value={`${averageScore}%`}
          />
        </div>

        <div className="mt-5 space-y-4">
          <InfoRow
            label="Completed Assessments"
            value={String(completedAssessments)}
          />

          <InfoRow
            label="Active Assessments"
            value={String(activeAssessments)}
          />
        </div>

        <div className="text-primary mt-auto flex items-center justify-between pt-6 text-sm font-medium">
          <span>View Assessments</span>

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
    <div className="bg-muted/40 rounded-xl p-4">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-muted-foreground text-xs tracking-wide uppercase">
        {label}
      </p>

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

export default memo(SubjectAssessmentSummary);
