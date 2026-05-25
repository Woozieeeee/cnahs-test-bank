import ActivitySeverityBadge from "../../activitySeverityBadge";
import { ACTIVITY_SEVERITY_COLORS } from "@/lib/constants/activitySeverity";
import MotionCard from "@/components/motion/motionCard";
import ActivityTimelineDot from "./activityTimelineDot";
import ActivityTimelineAvatar from "./activityTimelineAvatar";
import ActivityTimelineMeta from "./activityTimelineMeta";

interface Activity {
  id: number;
  action: string;
  category: string;
  severity: string;
  description?: string;
  performedBy: string;
  targetUser?: string;
  createdAt: string;
}

interface Props {
  activity: Activity;
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

  return (
    <div className="grid grid-cols-[84px_28px_1fr] gap-4">
      {/* TIME */}

      <div className="pt-5 text-right text-sm text-gray-400">
        {timeLabel}
      </div>

      {/* DOT */}

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
          className="
            w-full
            cursor-pointer
            rounded-xl
            border
            border-slate-200
            bg-slate-50/80
            p-5
            text-left
            transition-all
            hover:-translate-y-0.5
            hover:border-slate-300
            hover:bg-white
            hover:shadow-sm
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {/* HEADER */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  text-sm
                  text-slate-700
                "
              >
                <ActivityTimelineAvatar
                  performedBy={activity.performedBy}
                />

                <span className="font-semibold text-slate-900">
                  {activity.performedBy}
                </span>

                <span>{activity.action}</span>

                {activity.targetUser && (
                  <span
                    className="
                      rounded-md
                      bg-slate-200
                      px-2
                      py-0.5
                      font-medium
                      text-slate-700
                    "
                  >
                    {activity.targetUser}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}

              {activity.description && (
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {activity.description}
                </p>
              )}

              {/* META */}

              <ActivityTimelineMeta
                category={activity.category}
                createdAt={activity.createdAt}
              />
            </div>

            <ActivitySeverityBadge
              severity={activity.severity}
            />
          </div>
        </div>
      </MotionCard>
    </div>
  );
}
