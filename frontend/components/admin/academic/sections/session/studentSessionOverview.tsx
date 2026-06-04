"use client";

import { memo } from "react";

import StatusBadge from "@/components/common/badges/statusBadge";

import StatCard from "@/components/common/cards/statCard";

function StudentSessionOverview() {
  const student = {
    name: "Juan Cruz",

    studentId: "2024-001",

    status: "ACTIVE",

    riskLevel: "LOW",

    exam: "Pharmacology Midterm",

    progress: 72,

    currentDifficulty: "Intermediate",

    violations: 1,

    timeRemaining: "32 mins",
  };

  const initials = student.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      {/* BANNER */}

      <div className="from-primary/15 via-primary/5 to-background relative h-32 bg-gradient-to-r" />

      {/* CONTENT */}

      <div className="relative px-6 pb-6">
        {/* AVATAR */}

        <div className="border-card bg-primary text-primary-foreground absolute -top-10 flex h-20 w-20 items-center justify-center rounded-full border-4 text-xl font-bold">
          {initials}
        </div>

        {/* PROFILE */}

        <div className="pt-14">
          <h2 className="text-2xl font-bold">
            {student.name}
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            Student ID: {student.studentId}
          </p>

          {/* BADGES */}

          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge variant="success">
              {student.status}
            </StatusBadge>

            <StatusBadge variant="info">
              {student.riskLevel} RISK
            </StatusBadge>
          </div>

          {/* EXAM */}

          <div className="border-border mt-6 border-t pt-6">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">
              Current Exam
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {student.exam}
            </h3>
          </div>

          {/* STATS */}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <StatCard
              compact
              label="Progress"
              value={`${student.progress}%`}
            />

            <StatCard
              compact
              label="Difficulty"
              value={student.currentDifficulty}
            />

            <StatCard
              compact
              label="Violations"
              value={student.violations}
            />

            <StatCard
              compact
              label="Time Left"
              value={student.timeRemaining}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(StudentSessionOverview);
