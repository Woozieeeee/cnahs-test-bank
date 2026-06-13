"use client";

import { memo } from "react";
import type { Exam } from "@/types/exams/examMonitoring";

interface ExamDetailsHeaderProps {
  exam: Exam;
}

function ExamDetailsHeader({ exam }: ExamDetailsHeaderProps) {
  const statusColors: Record<string, string> = {
    SCHEDULED: "bg-blue-100 text-blue-700",
    ONGOING: "bg-green-100 text-green-700",
    COMPLETED: "bg-purple-100 text-purple-700",
    DRAFT: "bg-gray-100 text-gray-700",
    ARCHIVED: "bg-slate-100 text-slate-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const statusColor = statusColors[exam.status] || "bg-gray-100 text-gray-700";

  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{exam.title}</h1>
          <p className="text-muted-foreground mt-2">
            {exam.subjectName} • {exam.sectionName}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${statusColor}`}>
          {exam.status}
        </span>
      </div>
    </div>
  );
}

export default memo(ExamDetailsHeader);
