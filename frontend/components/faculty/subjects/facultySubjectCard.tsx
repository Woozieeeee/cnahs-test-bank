"use client";

import Link from "next/link";

import { memo } from "react";

interface Props {
  subject: {
    id: number;

    code: string;

    name: string;

    description: string | null;

    totalSections: number;

    totalStudents: number;

    totalQuestions: number;

    totalAssessments: number;
  };
}

function FacultySubjectCard({ subject }: Props) {
  return (
    <Link
      href={`/faculty/subjects/${subject.id}`}
      className="block"
    >
      <div className="border-border bg-card hover:border-ring rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        <h2 className="font-semibold">{subject.code}</h2>

        <p className="text-muted-foreground mt-1">
          {subject.name}
        </p>

        <p className="text-muted-foreground mt-4 text-sm">
          {subject.description ||
            "No description provided."}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <MetricCard
            label="Sections"
            value={subject.totalSections}
          />

          <MetricCard
            label="Students"
            value={subject.totalStudents}
          />

          <MetricCard
            label="Questions"
            value={subject.totalQuestions}
          />

          <MetricCard
            label="Assessments"
            value={subject.totalAssessments}
          />
        </div>

        <div className="text-primary mt-5 text-sm font-medium">
          Open Subject →
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
    <div className="bg-muted/40 rounded-xl p-4 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

export default memo(FacultySubjectCard);
