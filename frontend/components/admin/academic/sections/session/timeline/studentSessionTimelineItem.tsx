import { memo, useMemo } from "react";

import MotionCard from "@/components/motion/motionCard";

import StudentSessionTimelineDot from "./studentSessionTimelineDot";
import StudentSessionTimelineCategories from "./studentSessionTimelineCategories";
import StudentSessionTimelineHeader from "./studentSessionTimelineHeader";

import {
  getSeverityDotColor,
  getTimelineBorder,
} from "@/lib/timeline";

interface Props {
  event: {
    id: number;

    title: string;

    description: string;

    severity: string;

    categories: string[];

    createdAt: string;
  };

  isLast?: boolean;
}

function StudentSessionTimelineItem({
  event,
  isLast = false,
}: Props) {
  // =========================
  // STATE STYLES
  // =========================

  const severityColor = useMemo(
    () => getSeverityDotColor(event.severity),
    [event.severity]
  );

  const borderClass = useMemo(() => {
    const isViolation =
      event.categories.includes("VIOLATION");

    const isHighSeverity = event.severity === "ERROR";

    return getTimelineBorder(isViolation, isHighSeverity);
  }, [event.categories, event.severity]);

  // =========================
  // TIME
  // =========================

  const formattedTime = useMemo(() => {
    return new Date(event.createdAt).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }, [event.createdAt]);

  const formattedDate = useMemo(() => {
    return new Date(event.createdAt).toLocaleString();
  }, [event.createdAt]);

  return (
    <div className="grid grid-cols-[84px_28px_1fr] gap-4 pb-6">
      {/* TIME */}

      <div className="text-muted-foreground pt-5 text-right text-sm">
        {formattedTime}
      </div>

      {/* TIMELINE DOT */}

      <StudentSessionTimelineDot
        severityColor={severityColor}
        isLast={isLast}
      />

      {/* CARD */}

      <MotionCard>
        <div
          className={`bg-card rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${borderClass} `}
        >
          <div className="min-w-0 flex-1">
            {/* HEADER */}

            <StudentSessionTimelineHeader
              title={event.title}
              severity={event.severity}
            />

            {/* DESCRIPTION */}

            <p className="text-muted-foreground mt-3 text-sm leading-6">
              {event.description}
            </p>

            {/* CATEGORIES */}

            <StudentSessionTimelineCategories
              categories={event.categories}
            />

            {/* META */}

            <div className="border-border/50 text-muted-foreground mt-4 border-t pt-3 text-xs">
              {formattedDate}
            </div>
          </div>
        </div>
      </MotionCard>
    </div>
  );
}

export default memo(StudentSessionTimelineItem);
