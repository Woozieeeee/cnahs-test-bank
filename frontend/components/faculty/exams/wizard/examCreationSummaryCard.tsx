"use client";

import { memo } from "react";

import type { CreateExamInfo } from "@/types/exams/createExamInfo";
import type { CreateExamRules } from "@/types/exams/createExamRules";

interface Props {
  info: CreateExamInfo;

  rules: CreateExamRules;

  examLevel: string;

  questionLimit: number;

  sectionName?: string;
}

function ExamCreationSummaryCard({
  info,
  rules,
  examLevel,
  questionLimit,
  sectionName,
}: Props) {
  return (
    <div className="border-border bg-card h-fit rounded-2xl border p-5">
      <h3 className="font-semibold">Creation Summary</h3>

      <div className="mt-5 space-y-4 text-sm">
        <p>
          <span className="font-medium">Level:</span>{" "}
          {examLevel}
        </p>

        <p>
          <span className="font-medium">Questions:</span>{" "}
          {questionLimit}
        </p>

        <p>
          <span className="font-medium">Duration:</span>{" "}
          {info.duration} mins
        </p>

        <p>
          <span className="font-medium">
            Passing Score:
          </span>{" "}
          {info.passingScore}%
        </p>

        <p>
          <span className="font-medium">Section:</span>{" "}
          {sectionName}
        </p>

        <p>
          <span className="font-medium">
            Violation Limit:
          </span>{" "}
          {rules.violationThreshold}
        </p>

        <p>
          <span className="font-medium">Action:</span>{" "}
          {rules.thresholdAction}
        </p>

        <p>
          <span className="font-medium">Exam Code:</span>{" "}
          {info.examCode}
        </p>
      </div>
    </div>
  );
}

export default memo(ExamCreationSummaryCard);
