"use client";

import { memo } from "react";

import type { CreateExamInfo } from "@/types/exams/createExamInfo";

interface Props {
  info: CreateExamInfo;

  questionLimit: number;

  examLevel: string;

  sectionNames?: string;
}

function ExamSummaryCard({
  info,
  questionLimit,
  examLevel,
  sectionNames,
}: Props) {
  // Calculate duration from start and end times
  const getDuration = () => {
    if (!info.startsAt || !info.endsAt) return "-";
    
    const start = new Date(info.startsAt).getTime();
    const end = new Date(info.endsAt).getTime();
    
    if (end <= start) return "-";
    
    const durationMinutes = Math.round((end - start) / (1000 * 60));
    return `${durationMinutes} mins`;
  };

  // Format datetime for display
  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="border-border bg-card rounded-2xl border p-5">
      <h3 className="font-semibold">Exam Summary</h3>

      <p className="text-muted-foreground mt-1 text-sm">
        Review the assessment details.
      </p>

      <div className="mt-5 space-y-4 text-sm">
        <div>
          <p className="text-muted-foreground">Difficulty Level</p>

          <p className="font-medium">{examLevel}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Total Questions</p>

          <p className="font-medium">{questionLimit}</p>
        </div>

        {sectionNames && (
          <div>
            <p className="text-muted-foreground">Assigned Sections</p>

            <p className="font-medium text-xs">{sectionNames}</p>
          </div>
        )}

        <div>
          <p className="text-muted-foreground">Exam Duration</p>

          <p className="font-medium">{getDuration()}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Passing Score</p>

          <p className="font-medium">
            {info.passingScore}%
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">Starts At</p>

          <p className="font-medium text-xs">
            {formatDateTime(info.startsAt)}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">Question Timer</p>

          <p className="font-medium">
            {info.minutesPerQuestion === 0 
              ? "No timer (0:0)" 
              : `${info.minutesPerQuestion} min${info.minutesPerQuestion !== 1 ? "s" : ""}/question`}
          </p>
        </div>

        <div className="border-border border-t pt-3">
          <p className="text-muted-foreground text-xs">
            ✓ Automatically calculates duration from schedule
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(ExamSummaryCard);
