"use client";

import { memo } from "react";

import type { Violation } from "@/types/violation";

import TimelineItem from "@/components/common/timeline/timelineItem";
import TimelineTime from "@/components/common/timeline/timelineTime";
import TimelineDot from "@/components/common/timeline/timelineDot";
import TimelineContent from "@/components/common/timeline/timelineContent";

import ViolationSeverityBadge from "@/components/common/badges/violationSeverityBadge";

interface Props {
  violation: Violation;

  isLast?: boolean;

  onClick: () => void;
}

function ViolationItem({
  violation,
  isLast = false,
  onClick,
}: Props) {
  return (
    <TimelineItem>
      {/* TIME */}

      <TimelineTime>{violation.time}</TimelineTime>

      {/* DOT */}

      <TimelineDot color="bg-red-500" isLast={isLast} />

      {/* CONTENT */}

      <TimelineContent>
        <button
          onClick={onClick}
          className="w-full rounded-2xl border border-red-200/60 bg-red-50/20 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50/40 dark:border-red-900/60 dark:bg-red-950/20 dark:hover:border-red-800 dark:hover:bg-red-950/40"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-red-700 dark:text-red-400">
                {violation.type}
              </p>

              <p className="text-muted-foreground mt-1 text-xs">
                Click to review incident details.
              </p>
            </div>

            <ViolationSeverityBadge
              severity={violation.severity}
            />
          </div>
        </button>
      </TimelineContent>
    </TimelineItem>
  );
}

export default memo(ViolationItem);
