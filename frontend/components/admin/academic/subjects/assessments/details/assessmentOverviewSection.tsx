"use client";

import { memo } from "react";

interface Props {
  difficulty: string;
  status: string;
  duration: number;
  passingScore: number;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  students: number;
  averageScore: number;
  passingRate: number;
}

function AssessmentOverviewSection({
  difficulty,
  status,
  students,
  averageScore,
  passingScore,
  randomizeOptions,
  randomizeQuestions,
  duration,
  passingRate,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">
        Assessment Overview
      </h2>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <InfoRow label="Difficulty" value={difficulty} />

          <InfoRow label="Status" value={status} />

          <InfoRow
            label="Duration"
            value={`${duration} mins`}
          />

          <InfoRow
            label="Passing Score"
            value={`${passingScore}%`}
          />
        </div>

        <div className="space-y-4">
          <InfoRow
            label="Students Attempted"
            value={students}
          />

          <InfoRow
            label="Average Score"
            value={`${averageScore}%`}
          />

          <InfoRow
            label="Passing Rate"
            value={`${passingRate}%`}
          />

          <InfoRow
            label="Randomization"
            value={
              randomizeQuestions && randomizeOptions
                ? "Questions + Options"
                : "Disabled"
            }
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-muted-foreground text-xs uppercase">
        {label}
      </p>

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

export default memo(AssessmentOverviewSection);
