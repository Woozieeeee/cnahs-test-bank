"use client";

import { memo } from "react";
import type { Exam } from "@/types/exams/examMonitoring";

interface ExamStatisticsCardsProps {
  exam: Exam;
}

function ExamStatisticsCards({ exam }: ExamStatisticsCardsProps) {
  const totalStudents = exam.totalStudents || 0;
  const activeStudents = exam.activeStudents || 0;
  const completedStudents = exam.completedStudents || 0;
  const flaggedStudents = exam.flaggedStudents || 0;

  const statistics = [
    {
      label: "Total Students",
      value: totalStudents,
    },
    {
      label: "Active Now",
      value: activeStudents,
    },
    {
      label: "Completed",
      value: completedStudents,
    },
    {
      label: "Flagged",
      value: flaggedStudents,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {statistics.map((stat) => (
        <div
          key={stat.label}
          className="border-border bg-card rounded-2xl border p-5"
        >
          <p className="text-muted-foreground text-sm">
            {stat.label}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default memo(ExamStatisticsCards);
