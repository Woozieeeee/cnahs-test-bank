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
}

export default function ActivityTimelineItem({
  activity,
}: Props) {
  return (
    <div className="flex gap-3">
      {/* TIMELINE */}

      <div
        className="
    relative
    flex
    flex-col
    items-center
  "
      >
        {/* TOP LINE */}

        <div
          className="
      absolute
      top-0
      h-full
      w-px
      bg-gray-200
    "
        />

        {/* TIMELINE NODE */}

        <div
          className="
      relative
      z-10
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-full
      border
      border-gray-200
      bg-white
      shadow-sm
    "
        >
          <div
            className="
        h-3
        w-3
        rounded-full
        bg-black
      "
          />
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          flex-1
          rounded-2xl
          border
          border-gray-100
          bg-white
          p-4
          shadow-sm
          transition
          hover:-translate-y-0.5
          hover:shadow-md
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div>
            <h3 className="font-semibold">
              {activity.action}
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-gray-600
              "
            >
              {activity.description}
            </p>

            <div
              className="
                mt-3
                flex
                flex-wrap
                items-center
                gap-2
                text-xs
                text-gray-500
              "
            >
              <span>{activity.category}</span>

              <span>•</span>

              <span>{activity.performedBy}</span>

              {activity.targetUser && (
                <>
                  <span>•</span>

                  <span>{activity.targetUser}</span>
                </>
              )}
            </div>
          </div>

          <div
            className="
              flex
              flex-col
              items-end
              gap-2
            "
          >
            <ActivitySeverityBadge
              severity={activity.severity}
            />

            <p
              className="
                text-xs
                text-gray-400
              "
            >
              {new Date(
                activity.createdAt
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
