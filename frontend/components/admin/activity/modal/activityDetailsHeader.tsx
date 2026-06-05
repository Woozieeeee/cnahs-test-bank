import ActivitySeverityBadge from "../activitySeverityBadge";

import type { ActivityLog } from "@/types/activity/activity";

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

          <span className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-xs font-medium">
            {activity.categories}
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-bold">
          {activity.action}
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          {new Date(activity.createdAt).toLocaleString()}
        </p>
      </div>

      <button
        onClick={onClose}
        className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-3 py-1 transition"
      >
        ✕
      </button>
    </div>
  );
}
