"use client";

import { memo } from "react";

interface Props {
  totalSubjects: number;

  totalSections: number;

  totalStudents: number;

  totalQuestions: number;
}

function FacultySubjectsStats({
  totalSubjects,
  totalSections,
  totalStudents,
  totalQuestions,
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
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

export default memo(FacultySubjectsStats);
