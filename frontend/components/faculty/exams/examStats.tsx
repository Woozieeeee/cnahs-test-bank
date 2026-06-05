"use client";

import { memo, useMemo } from "react";

import { FacultyExam } from "@/types/exams/facultyExam";

interface Props {
  exams: FacultyExam[];
}

function ExamStats({ exams }: Props) {
  const stats = useMemo(() => {
    return {
      total: exams.length,

      draft: exams.filter((exam) => exam.status === "DRAFT")
        .length,

      scheduled: exams.filter(
        (exam) => exam.status === "SCHEDULED"
      ).length,

      ongoing: exams.filter(
        (exam) => exam.status === "ONGOING"
      ).length,
    };
  }, [exams]);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard label="Total Exams" value={stats.total} />

      <StatCard label="Draft" value={stats.draft} />

      <StatCard label="Scheduled" value={stats.scheduled} />

      <StatCard label="Ongoing" value={stats.ongoing} />
    </div>
  );
}

const StatCard = memo(function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="border-border bg-card rounded-2xl border p-5">
      <p className="text-muted-foreground text-sm">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
});

export default memo(ExamStats);
