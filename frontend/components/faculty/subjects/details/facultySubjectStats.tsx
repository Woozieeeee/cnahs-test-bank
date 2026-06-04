"use client";

import { memo } from "react";

interface Props {
  totalTopics: number;

  totalQuestions: number;

  totalAssessments: number;

  totalStudents: number;
}

function FacultySubjectStats({
  totalTopics,
  totalQuestions,
  totalAssessments,
  totalStudents,
}: Props) {
  const stats = [
    {
      label: "Topics",
      value: totalTopics,
    },

    {
      label: "Questions",
      value: totalQuestions,
    },

    {
      label: "Assessments",
      value: totalAssessments,
    },

    {
      label: "Students",
      value: totalStudents,
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

export default memo(FacultySubjectStats);
