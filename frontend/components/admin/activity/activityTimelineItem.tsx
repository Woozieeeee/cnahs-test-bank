import ActivitySeverityBadge from "./activitySeverityBadge";

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
  const initials = activity.performedBy
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="grid grid-cols-[84px_28px_1fr] gap-4">
      <div className="pt-5 text-right text-sm text-gray-400">
        {timeLabel}
      </div>

      <div className="relative flex justify-center">
        {!isLast && (
          <div
            className="
              absolute
              left-1/2
              top-7
              h-full
              w-px
              -translate-x-1/2
              bg-slate-200
            "
          />
        )}

        <div
          className="
            relative
            z-10
            mt-5
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-sky-50
          "
        >
          <div className="h-2 w-2 rounded-full bg-sky-500" />
        </div>
      </div>

      <button
        onClick={onClick}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-slate-50/80
          p-5
          transition
          hover:border-slate-300
          hover:bg-white
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
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
              <div
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-900
                  text-xs
                  font-semibold
                  text-white
                "
              >
                {initials || "A"}
              </div>

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

            {activity.description && (
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {activity.description}
              </p>
            )}

            <div
              className="
                mt-3
                flex
                flex-wrap
                items-center
                gap-2
                text-xs
                text-slate-500
              "
            >
              <span>{activity.category}</span>

              <span>&bull;</span>

              <span>
                {new Date(
                  activity.createdAt
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <ActivitySeverityBadge
            severity={activity.severity}
          />
        </div>
      </button>
    </div>
  );
}
