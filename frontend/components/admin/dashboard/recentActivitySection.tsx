import Link from "next/link";

import { ChevronDown } from "lucide-react";

import ActivityTimelineItem from "@/components/admin/activity/activityTimelineItem";

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
    (Date.now() - date.getTime()) / 60000,
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
    const label = getDateLabel(new Date(activity.createdAt));

    return {
      ...groups,
      [label]: [...(groups[label] || []), activity],
    };
  }, {});

  const groups = Object.entries(groupedActivities);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">
            Recent Activity
          </h2>

          <p className="text-sm text-slate-500">
            Latest meaningful administrative actions
          </p>
        </div>

        <Link
          href="/admin/activity-logs"
          className="
            rounded-lg
            border
            border-slate-200
            px-4
            py-2
            text-sm
            font-medium
            text-slate-700
            transition
            hover:border-slate-300
            hover:bg-slate-50
          "
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

                <div
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-slate-500
                  "
                >
                  <ChevronDown size={16} />
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700">
                    {label}
                  </h3>

                  <span
                    className="
                      rounded-full
                      bg-slate-100
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-slate-500
                    "
                  >
                    {group.length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {group.map((activity, index) => (
                  <ActivityTimelineItem
                    key={activity.id}
                    activity={activity}
                    timeLabel={getTimeLabel(
                      new Date(activity.createdAt),
                    )}
                    isLast={index === group.length - 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="
            rounded-xl
            border
            border-dashed
            border-slate-200
            bg-slate-50
            p-8
            text-center
            text-sm
            text-slate-500
          "
        >
          No recent activity found.
        </div>
      )}
    </section>
  );
}
