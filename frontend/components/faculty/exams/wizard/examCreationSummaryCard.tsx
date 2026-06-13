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
  // Calculate duration from start and end times
  const calculateDuration = () => {
    if (!info.startsAt || !info.endsAt) return "-";
    try {
      const start = new Date(info.startsAt).getTime();
      const end = new Date(info.endsAt).getTime();
      if (end <= start) return "-";
      const minutes = Math.round((end - start) / (1000 * 60));
      return `${minutes} mins`;
    } catch {
      return "-";
    }
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
    <div className="border-border bg-card h-fit rounded-2xl border p-5 sticky top-6">
      <h3 className="font-semibold">Exam Summary</h3>

      <p className="text-muted-foreground mt-1 text-xs">
        Quick reference of your exam configuration
      </p>

      <div className="mt-5 space-y-3 text-sm">
        {/* Difficulty & Questions */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-muted-foreground text-xs">Difficulty</p>
            <p className="font-medium">{examLevel}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Questions</p>
            <p className="font-medium">{questionLimit}</p>
          </div>
        </div>

        {/* Duration */}
        <div className="bg-primary/10 text-primary rounded-lg p-3">
          <p className="text-xs font-medium">Duration</p>
          <p className="mt-1 font-semibold">{calculateDuration()}</p>
          <p className="text-xs mt-1">
            Calculated from schedule
          </p>
        </div>

        {/* Question Timer */}
        <div>
          <p className="text-muted-foreground text-xs">Question Timer</p>
          <p className="font-medium">
            {info.minutesPerQuestion === 0 
              ? "No timer (0:0)" 
              : `${info.minutesPerQuestion} min${info.minutesPerQuestion !== 1 ? "s" : ""}/question`}
          </p>
        </div>

        {/* Passing Score */}
        <div>
          <p className="text-muted-foreground text-xs">Passing Score</p>
          <p className="font-medium">{info.passingScore}%</p>
        </div>

        {/* Section */}
        {sectionName && (
          <div>
            <p className="text-muted-foreground text-xs">Assigned Section</p>
            <p className="font-medium text-xs line-clamp-2">{sectionName}</p>
          </div>
        )}

        {/* Schedule */}
        <div className="border-border border-t pt-3 space-y-2">
          <div>
            <p className="text-muted-foreground text-xs">Starts</p>
            <p className="text-xs">{formatDateTime(info.startsAt)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Ends</p>
            <p className="text-xs">{formatDateTime(info.endsAt)}</p>
          </div>
        </div>

        {/* Exam Code */}
        <div>
          <p className="text-muted-foreground text-xs">Exam Code</p>
          <p className="font-mono text-xs bg-muted rounded px-2 py-1">
            {info.examCode}
          </p>
        </div>

        {/* Security & Rules */}
        <div className="border-border border-t pt-3 space-y-2">
          <div>
            <p className="text-muted-foreground text-xs">Violation Threshold</p>
            <p className="font-medium">{rules.violationThreshold}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Action on Violation</p>
            <p className="font-medium text-xs">
              {rules.thresholdAction === "AUTO_SUBMIT"
                ? "Auto Submit"
                : rules.thresholdAction === "END_EXAM"
                ? "End Exam"
                : "Flag for Review"}
            </p>
          </div>
        </div>

        {/* Active Rules Count */}
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground text-xs">Active Protections</p>
          <p className="mt-1 font-semibold">
            {[
              rules.randomizeQuestions,
              rules.randomizeAnswers,
              rules.requireFullscreen,
              rules.detectTabSwitch,
              rules.detectWindowBlur,
              rules.blockCopy,
              rules.blockPaste,
              rules.blockRightClick,
              rules.detectDeviceChange,
            ].filter(Boolean).length}{" "}
            / 9
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(ExamCreationSummaryCard);
