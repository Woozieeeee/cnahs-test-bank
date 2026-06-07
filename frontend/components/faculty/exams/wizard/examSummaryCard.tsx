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
  return (
    <div className="border-border bg-card rounded-2xl border p-5">
      <h3 className="font-semibold">Exam Summary</h3>

      <p className="text-muted-foreground mt-1 text-sm">
        Review the assessment details.
      </p>

      <div className="mt-5 space-y-4 text-sm">
        <div>
          <p className="text-muted-foreground">Level</p>

          <p className="font-medium">{examLevel}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Questions</p>

          <p className="font-medium">{questionLimit}</p>

          {sectionNames && (
            <p>
              <span className="font-medium">Section:</span>{" "}
              {sectionNames}
            </p>
          )}
        </div>

        <div>
          <p className="text-muted-foreground">Duration</p>

          <p className="font-medium">
            {info.duration} mins
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Passing Score
          </p>

          <p className="font-medium">
            {info.passingScore}%
          </p>
        </div>

        {sectionNames && (
          <div>
            <p className="text-muted-foreground">Section</p>

            <p className="font-medium">{sectionNames}</p>
          </div>
        )}

        <div>
          <p className="text-muted-foreground">Starts At</p>

          <p className="font-medium">
            {info.startsAt || "-"}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">Ends At</p>

          <p className="font-medium">
            {info.endsAt || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(ExamSummaryCard);
