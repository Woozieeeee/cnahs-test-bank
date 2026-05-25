import MotionCard from "@/components/motion/motionCard";
import ActivitySeverityBadge from "../../activitySeverityBadge";
import ActivityTimelineDot from "./activityTimelineDot";
import ActivityTimelineMeta from "./activityTimelineMeta";
import ActivityTimelineHeader from "./activityTimelineHeader";
import ActivityTimelineCategories from "./activityTimelineCategories";
import { ACTIVITY_SEVERITY_COLORS } from "@/lib/constants/activitySeverity";
import type { ActivityLog } from "@/types/activity";

interface Props {
  activity: ActivityLog;

  timeLabel: string;

  isLast?: boolean;

  onClick?: () => void;
}

export default function ActivityTimelineItem({
  activity,
  timeLabel,
  onClick,
  isLast = false,
}: Props) {
  const severityColor =
    ACTIVITY_SEVERITY_COLORS[
      activity.severity as keyof typeof ACTIVITY_SEVERITY_COLORS
    ] || "bg-slate-400";

  const isViolation =
    activity.categories.includes("VIOLATIONS");

  const isHighSeverity = activity.severity === "ERROR";

  return (
    <div className="grid grid-cols-[84px_28px_1fr] gap-4">
      {/* TIME */}

      <div className="pt-5 text-right text-sm text-gray-400">
        {timeLabel}
      </div>

      {/* TIMELINE DOT */}

      <ActivityTimelineDot
        severityColor={severityColor}
        isLast={isLast}
      />

      {/* CARD */}

      <MotionCard>
        <div
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClick?.();
            }
          }}
          className={`
            w-full
            cursor-pointer
            rounded-xl
            border
            p-5
            text-left
            transition-all
            hover:-translate-y-0.5
            hover:shadow-sm

            ${
              isViolation
                ? `
                  border-red-200
                  bg-red-50/50
                  hover:border-red-300
                  hover:bg-red-50
                `
                : isHighSeverity
                  ? `
                    border-amber-200
                    bg-amber-50/40
                    hover:border-amber-300
                  `
                  : `
                    border-slate-200
                    bg-slate-50/80
                    hover:border-slate-300
                  `
            }
          `}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {/* HEADER */}

              <ActivityTimelineHeader
                activity={activity}
                isViolation={isViolation}
              />

              {/* DESCRIPTION */}

              {activity.description && (
                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-slate-600
                  "
                >
                  {activity.description}
                </p>
              )}

              {/* CATEGORIES */}

              <ActivityTimelineCategories
                categories={activity.categories}
              />

              {/* META */}

              <ActivityTimelineMeta
                createdAt={activity.createdAt}
              />
            </div>

            {/* SEVERITY */}

            <ActivitySeverityBadge
              severity={activity.severity}
            />
          </div>
        </div>
      </MotionCard>
    </div>
  );
}
