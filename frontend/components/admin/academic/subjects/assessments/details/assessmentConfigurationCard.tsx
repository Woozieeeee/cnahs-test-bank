"use client";

import { memo } from "react";

interface Props {
  difficulty: string;

  status: string;

  duration: number;

  passingScore: number;

  randomizeQuestions: boolean;

  randomizeOptions: boolean;
}

function AssessmentConfigurationCard({
  difficulty,
  status,
  duration,
  passingScore,
  randomizeQuestions,
  randomizeOptions,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">
        Assessment Configuration
      </h2>

      <p className="text-muted-foreground mt-1 text-sm">
        Exam settings and progression rules.
      </p>

      <div className="mt-6 space-y-4">
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

        <InfoRow
          label="Question Shuffle"
          value={
            randomizeQuestions ? "Enabled" : "Disabled"
          }
        />

        <InfoRow
          label="Option Shuffle"
          value={randomizeOptions ? "Enabled" : "Disabled"}
        />
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

export default memo(AssessmentConfigurationCard);
