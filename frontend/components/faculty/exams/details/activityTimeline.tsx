"use client";

import { memo } from "react";
import type { Exam } from "@/types/exams/examMonitoring";
import MotionCard from "@/components/motion/motionCard";
import TimelineDot from "@/components/common/timeline/timelineDot";

interface ActivityTimelineProps {
  exam: Exam;
}

function ActivityTimeline({ exam }: ActivityTimelineProps) {
  // Get activities from exam violations
  const activities = (exam.violations?.recent || []).map((v) => {
    const severityMap = {
      LOW: "INFO" as const,
      MEDIUM: "WARNING" as const,
      HIGH: "ERROR" as const,
    };

    const colorMap = {
      LOW: "bg-blue-500",
      MEDIUM: "bg-orange-500",
      HIGH: "bg-red-500",
    };

    return {
      id: v.id,
      timestamp: new Date(v.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      studentName: v.studentName,
      action: getViolationActionText(v.type),
      color: colorMap[v.severity as keyof typeof colorMap] || "bg-gray-500",
      severity: severityMap[v.severity as keyof typeof severityMap] || "INFO",
      isViolation: true,
      type: v.type,
      isLast: v === (exam.violations?.recent || [])[((exam.violations?.recent || []).length || 1) - 1],
    };
  });

  const severityStyles = {
    INFO: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    SUCCESS: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    WARNING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    ERROR: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  const getCardStyle = (activity: any) => {
    if (activity.isViolation) {
      return "border-red-500 bg-red-50 hover:border-red-600 hover:bg-red-100 dark:border-red-600 dark:bg-red-950 dark:hover:bg-red-900";
    }
    if (activity.severity === "ERROR") {
      return "border-amber-200 bg-amber-50 hover:border-amber-300 dark:border-amber-700 dark:bg-amber-950 dark:hover:bg-amber-900";
    }
    return "bg-muted/30 hover:border-border/70 border-slate-200 dark:border-slate-700";
  };

  return (
    <MotionCard className="bg-card rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-8">Activity Feed</h3>

      {activities.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No violations recorded</p>
      ) : (
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={activity.id} className="grid grid-cols-[84px_28px_1fr] gap-4">
              {/* TIME */}
              <div className="text-muted-foreground pt-5 text-right text-sm">
                {activity.timestamp}
              </div>

              {/* TIMELINE DOT */}
              <TimelineDot
                color={activity.color}
                isLast={activity.isLast}
              />

              {/* CARD */}
              <MotionCard>
                <div
                  className={`w-full cursor-pointer rounded-xl border p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm ${getCardStyle(activity)}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      {/* HEADER */}
                      <div className="text-foreground flex flex-wrap items-center gap-2 text-sm">
                        <span className="text-foreground font-semibold">
                          {activity.studentName}
                        </span>
                        <span>{activity.action}</span>
                        {activity.isViolation && (
                          <span className="rounded-full border border-red-600 bg-red-100 px-2 py-1 text-[10px] font-bold tracking-wide text-red-700 dark:border-red-400 dark:bg-red-950 dark:text-red-300 uppercase">
                            Violation
                          </span>
                        )}
                      </div>
                    </div>

                    {/* SEVERITY BADGE */}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${
                        severityStyles[activity.severity as keyof typeof severityStyles] ||
                        severityStyles.INFO
                      }`}
                    >
                      {activity.severity}
                    </span>
                  </div>
                </div>
              </MotionCard>
            </div>
          ))}
        </div>
      )}
    </MotionCard>
  );
}

function getViolationActionText(violationType: string): string {
  const violationMap: Record<string, string> = {
    TAB_SWITCH: "switched tabs",
    WINDOW_BLUR: "window blur detected",
    DEVICE_CHANGE: "device change detected",
    MULTIPLE_FACES: "multiple faces detected",
    NO_FACE: "no face detected",
    SUSPICIOUS_ACTIVITY: "suspicious activity detected",
  };
  return violationMap[violationType] || "violation detected";
}

export default memo(ActivityTimeline);
