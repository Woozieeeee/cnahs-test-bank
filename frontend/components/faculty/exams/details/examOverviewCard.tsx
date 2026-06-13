"use client";

import { memo } from "react";
import type { Exam } from "@/types/exams/examMonitoring";

interface ExamOverviewCardProps {
  exam: Exam;
}

function ExamOverviewCard({ exam }: ExamOverviewCardProps) {
  const progressPercentage = exam.progressPercentage || 0;
  const totalStudents = exam.totalStudents || 0;
  const completedStudents = exam.completedStudents || 0;
  const inProgressStudents = totalStudents - completedStudents;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Exam Progress</h3>
        <span className="text-3xl font-bold text-primary">{progressPercentage.toFixed(1)}%</span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-muted-foreground text-xs font-medium">Total</p>
          <p className="mt-2 text-2xl font-bold">{totalStudents}</p>
        </div>
        <div className="border-l border-r border-border text-center">
          <p className="text-muted-foreground text-xs font-medium">Completed</p>
          <p className="mt-2 text-2xl font-bold text-green-600">{completedStudents}</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-xs font-medium">In Progress</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">{inProgressStudents}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(ExamOverviewCard);
