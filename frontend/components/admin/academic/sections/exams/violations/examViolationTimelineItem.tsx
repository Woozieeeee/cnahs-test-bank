"use client";

import MotionCard from "@/components/motion/motionCard";
import type { ExamViolation } from "@/types/assessments/examViolation";
import ActivitySeverityBadge from "@/components/admin/activity/activitySeverityBadge";
import ActivityTimelineDot from "@/components/admin/activity/timeline/item/activityTimelineDot";

interface Violation {
  id: number;

  student: string;

  studentId: string;

  type: string;

  severity: string;

  description: string;

  timeAgo: string;

  createdAt: string;
}

interface Props {
  violation: ExamViolation;

  isLast?: boolean;

  onClick: (violation: ExamViolation) => void;
}
const SEVERITY_COLORS = {
  HIGH: "bg-red-500",

  MEDIUM: "bg-amber-500",

  LOW: "bg-sky-500",
};

export default function ExamViolationTimelineItem({
  violation,
  isLast = false,
  onClick,
}: Props) {
  const severityColor =
    SEVERITY_COLORS[
      violation.severity as keyof typeof SEVERITY_COLORS
    ] || "bg-slate-400";

  return (
    <div className="grid grid-cols-[84px_28px_1fr] gap-4">
      {/* TIME */}
      <div className="text-muted-foreground pt-5 text-right text-sm">
        {violation.timeAgo}
      </div>
      {/* TIMELINE */}
      <ActivityTimelineDot
        severityColor={severityColor}
        isLast={isLast}
      />
      {/* CARD */}
      <MotionCard>
        <div
          onClick={() => onClick(violation)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClick(violation);
            }
          }}
          className="w-full cursor-pointer rounded-xl border border-red-200 bg-red-50/30 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:shadow-sm dark:border-red-900/60 dark:bg-red-950/20 dark:hover:border-red-800 dark:hover:bg-red-950/40"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {/* HEADER */}

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-foreground font-semibold">
                  {violation.student}
                </span>

                <span className="bg-muted rounded-md px-2 py-0.5 text-xs font-medium dark:text-red-400">
                  {violation.studentId}
                </span>
              </div>

              {/* TYPE */}

              <p className="mt-2 font-medium text-red-700 dark:text-red-400">
                {violation.type}
              </p>

              {/* DESCRIPTION */}

              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {violation.description}
              </p>

              {/* TIMESTAMP */}

              <div className="text-muted-foreground mt-3 text-xs">
                {new Date(
                  violation.createdAt
                ).toLocaleString()}
              </div>
            </div>

            {/* SEVERITY */}

            <ActivitySeverityBadge
              severity={violation.severity}
            />
          </div>
        </div>
      </MotionCard>
    </div>
  );
}
