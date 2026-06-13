import Link from "next/link";

import { ChevronDown } from "lucide-react";

import ActivityTimelineItem from "@/components/admin/activity/timeline/item/activityTimelineItem";

interface Activity {
  id: number;

  action: string;

  categories: string[];

  severity: string;

  description?: string;

  performedBy: string;

  targetUser?: string;

  createdAt: string;
}

interface Props {
  activities: Activity[];
}

const getDateLabel = (date: Date) => {
  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getTimeLabel = (date: Date) => {
  const diffInMinutes = Math.floor(
    (Date.now() - date.getTime()) / 60000
  );

  if (diffInMinutes < 1) {
    return "Just now";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function RecentActivitySection({
  activities,
}: Props) {
  const groupedActivities = activities.reduce<
    Record<string, Activity[]>
  >((groups, activity) => {
    const label = getDateLabel(
      new Date(activity.createdAt)
    );

    return {
      ...groups,
      [label]: [...(groups[label] || []), activity],
    };
  }, {});

  const groups = Object.entries(groupedActivities);

  const handleActivityClick = (activityId: number) => {
    // Store the activity ID to highlight on the activity logs page
    sessionStorage.setItem("highlightActivityId", String(activityId));
  };

  return (
    <section className="border-border bg-card rounded-2xl border p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-card-foreground text-xl font-semibold">
            Recent Activity
          </h2>

          <p className="text-muted-foreground text-sm">
            Latest meaningful administrative actions
          </p>
        </div>

        <Link
          href="/admin/activity-logs"
          className="border-border text-foreground hover:bg-muted rounded-lg border px-4 py-2 text-sm font-medium transition"
        >
          View All
        </Link>
      </div>

      {groups.length > 0 ? (
        <div className="space-y-10">
          {groups.map(([label, group]) => (
            <div key={label}>
              <div className="mb-4 grid grid-cols-[84px_28px_1fr] gap-4">
                <div />

                <div className="bg-muted text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full">
                  <ChevronDown size={16} />
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-foreground text-sm font-semibold">
                    {label}
                  </h3>

                  <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-semibold">
                    {group.length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {group.map((activity, index) => (
                  <Link
                    key={activity.id}
                    href={`/admin/activity-logs?highlight=${activity.id}`}
                    onClick={() => handleActivityClick(activity.id)}
                    className="block transition-colors hover:opacity-80"
                  >
                    <ActivityTimelineItem
                      activity={activity}
                      timeLabel={getTimeLabel(
                        new Date(activity.createdAt)
                      )}
                      isLast={index === group.length - 1}
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-border bg-muted/40 text-muted-foreground rounded-xl border border-dashed p-8 text-center text-sm">
          No recent activity found.
        </div>
      )}
    </section>
  );
}
