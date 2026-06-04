"use client";

import { memo } from "react";

import Link from "next/link";

interface Props {
  subjectId: number;

  totalTopics: number;

  totalQuestions: number;

  totalAssessments: number;
}

function FacultyTopicsPreview({
  subjectId,
  totalTopics,
  totalQuestions,
  totalAssessments,
}: Props) {
  return (
    <Link
      href={`/faculty/subjects/${subjectId}/topics`}
      className="block h-full"
    >
      <div className="border-border bg-card hover:border-ring flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">
            Topic Management
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            Organize learning areas and question categories.
          </p>
        </div>

        <div className="mt-6 grid gap-3">
          <MetricCard label="Topics" value={totalTopics} />

          <MetricCard
            label="Questions"
            value={totalQuestions}
          />
        </div>

        <div className="mt-5">
          <InfoRow
            label="Assessments"
            value={String(totalAssessments)}
          />
        </div>

        <div className="text-primary mt-auto pt-6 text-sm font-medium">
          Manage Topics →
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

export default memo(FacultyTopicsPreview);
