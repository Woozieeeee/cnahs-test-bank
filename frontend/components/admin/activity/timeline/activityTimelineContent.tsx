import ActivityTimelineItem from "./item/activityTimelineItem";
import type { ActivityLog } from "@/types/activity/activity";

interface Props {
  logs: ActivityLog[];

  onSelectActivity: (activity: ActivityLog) => void;

  highlightId?: number;
}

export default function ActivityTimelineContent({
  logs,
  onSelectActivity,
  highlightId,
}: Props) {
  return (
    <div className="space-y-8">
      {logs.map((activity, index) => (
        <div
          key={activity.id}
          id={`activity-${activity.id}`}
          className={
            highlightId === activity.id
              ? "ring-2 ring-blue-500 rounded-lg p-2"
              : ""
          }
        >
          <ActivityTimelineItem
            activity={activity}
            timeLabel={new Date(
              activity.createdAt
            ).toLocaleTimeString()}
            isLast={index === logs.length - 1}
            onClick={() => onSelectActivity(activity)}
          />
        </div>
      ))}
    </div>
  );
}
