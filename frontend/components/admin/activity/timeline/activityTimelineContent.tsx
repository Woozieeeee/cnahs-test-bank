import ActivityTimelineItem from "./item/activityTimelineItem";

interface ActivityLog {
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
