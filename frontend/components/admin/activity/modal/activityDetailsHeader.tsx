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
              bg-slate-100
              px-2
              py-1
              text-xs
              font-medium
              text-slate-600
            "
          >
            {activity.categories}
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-bold">
          {activity.action}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {new Date(activity.createdAt).toLocaleString()}
        </p>
      </div>

      <button
        onClick={onClose}
        className="
          rounded-lg
          px-3
          py-1
          text-slate-500
          transition
          hover:bg-slate-100
          hover:text-slate-900
        "
      >
        ✕
      </button>
    </div>
  );
}
