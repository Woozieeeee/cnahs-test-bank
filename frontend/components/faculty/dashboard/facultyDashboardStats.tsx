"use client";

import { memo } from "react";

interface Props {
  totalSubjects: number;
  totalSections: number;
  totalStudents: number;
  totalQuestions: number;
  totalExams: number;
}

function FacultyDashboardStats({
  totalSubjects,
  totalSections,
  totalStudents,
  totalQuestions,
  totalExams,
}: Props) {
  const stats = [
    {
      label: "Subjects",
      value: totalSubjects,
    },
    {
      label: "Sections",
      value: totalSections,
    },
    {
      label: "Students",
      value: totalStudents,
    },
    {
      label: "Questions",
      value: totalQuestions,
    },
    {
      label: "Exams",
      value: totalExams,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
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

export default memo(FacultyDashboardStats);
