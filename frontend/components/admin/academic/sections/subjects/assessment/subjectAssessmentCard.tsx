"use client";

import { memo } from "react";

import Link from "next/link";

interface Assessment {
  id: number;

  title: string;

  difficulty: string;

  status: string;

  averageScore: number;

  passRate: number;

  violations: number;

  totalStudents: number;

  createdAt: string;
}

interface Props {
  sectionId: number;

  subjectId: number;

  assessment: Assessment;
}

function SubjectAssessmentCard({
  sectionId,
  subjectId,
  assessment,
}: Props) {
  const statusColor =
    assessment.status === "ONGOING"
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <Link
      href={`/admin/academic/sections/${sectionId}/subjects/${subjectId}/assessment/${assessment.id}`}
      className="block"
    >
      <div className="border-border bg-card hover:border-ring rounded-2xl border p-6 transition-all duration-200 hover:shadow-sm">
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-foreground font-semibold">
              {assessment.title}
            </h3>

            <p className="text-muted-foreground mt-1 text-sm">
              {assessment.difficulty}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${statusColor} `}
            />

            <span className="text-muted-foreground text-xs font-medium">
              {assessment.status}
            </span>
          </div>
        </div>

        {/* METRICS */}

        <div className="mt-6 grid grid-cols-3 gap-4">
          <Metric
            label="Average"
            value={`${assessment.averageScore}%`}
          />

          <Metric
            label="Pass Rate"
            value={`${assessment.passRate}%`}
          />

          <Metric
            label="Violations"
            value={assessment.violations}
          />
        </div>

        {/* FOOTER */}

        <div className="border-border text-primary mt-6 border-t pt-4 text-sm font-medium">
          View Assessment →
        </div>
      </div>
    </Link>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-3 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}

export default memo(SubjectAssessmentCard);
