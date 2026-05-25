import ActivityTimelineItem from "./item/activityTimelineItem";
import type { ActivityLog } from "@/types/activity";

interface Props {
  logs: ActivityLog[];

  onSelectActivity: (activity: ActivityLog) => void;
}

export default function ActivityTimelineContent({
  logs,
  onSelectActivity,
}: Props) {
  return (
    <div className="space-y-8">
      {logs.map((activity, index) => (
        <ActivityTimelineItem
          key={activity.id}
          activity={activity}
          timeLabel={new Date(
            activity.createdAt
          ).toLocaleTimeString()}
          isLast={index === logs.length - 1}
          onClick={() => onSelectActivity(activity)}
        />
      ))}
    </div>
  );
}
