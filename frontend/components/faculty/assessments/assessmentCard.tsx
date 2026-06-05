"use client";

import { memo } from "react";

import Link from "next/link";

import MotionCard from "@/components/motion/motionCard";

import type { Assessment } from "@/types/assessments/assessment";

interface Props {
  assessment: Assessment;
}

function AssessmentCard({ assessment }: Props) {
  const statusColors = {
    DRAFT: "bg-gray-100 text-gray-700",

    SCHEDULED: "bg-blue-100 text-blue-700",

    ONGOING: "bg-green-100 text-green-700",

    COMPLETED: "bg-purple-100 text-purple-700",

    ARCHIVED: "bg-red-100 text-red-700",
  };

  return (
    <MotionCard>
      <Link
        href={`/faculty/exams/${assessment.id}`}
        className="border-border bg-card hover:border-primary/30 block rounded-2xl border p-5 transition-all"
      >
        <div className="flex h-full flex-col">
          {/* HEADER */}

          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="line-clamp-2 text-lg font-semibold">
                {assessment.title}
              </h3>

              <p className="text-muted-foreground mt-1 text-sm">
                {assessment.section.name}
              </p>
            </div>

            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                statusColors[assessment.status]
              }`}
            >
              {assessment.status}
            </span>
          </div>

          {/* METRICS */}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <MetricCard
              label="Questions"
              value={assessment._count.examQuestions}
            />

            <MetricCard
              label="Attempts"
              value={assessment._count.attempts}
            />

            <MetricCard
              label="Duration"
              value={`${assessment.duration}m`}
            />

            <MetricCard
              label="Passing"
              value={`${assessment.passingScore}%`}
            />
          </div>

          {/* FOOTER */}

          <div className="mt-5">
            <p className="text-muted-foreground text-xs">
              Difficulty
            </p>

            <p className="font-medium">
              {assessment.difficulty}
            </p>
          </div>

          <div className="text-primary mt-auto pt-5 text-sm font-medium">
            Open Assessment →
          </div>
        </div>
      </Link>
    </MotionCard>
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

export default memo(AssessmentCard);
