import ActivitySeverityBadge from "../activitySeverityBadge";

import type { ActivityLog } from "@/types/activity";

interface Props {
  activity: ActivityLog;

  onClose: () => void;
}

export default function ActivityDetailsHeader({
  activity,
  onClose,
}: Props) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2">
          <ActivitySeverityBadge
            severity={activity.severity}
          />

          <span
            className="
              rounded-md
              bg-muted
              px-2
              py-1
              text-xs
              font-medium
              text-muted-foreground
            "
          >
            {activity.categories}
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-bold">
          {activity.action}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {new Date(activity.createdAt).toLocaleString()}
        </p>
      </div>

      <button
        onClick={onClose}
        className="
          rounded-lg
          px-3
          py-1
          text-muted-foreground
          transition
          hover:bg-muted
          hover:text-foreground
        "
      >
        ✕
      </button>
    </div>
  );
}
