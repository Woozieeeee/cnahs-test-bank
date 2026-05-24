import Link from "next/link";

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

export default function RecentActivitySection({
  activities,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
      "
    >
      {/* HEADER */}

      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Recent Activity
          </h2>

          <p className="text-sm text-gray-500">
            Latest administrative actions
          </p>
        </div>

        <Link
          href="/admin/activity-logs"
          className="
            text-sm
            font-medium
            text-black
            hover:underline
          "
        >
          View All
        </Link>
      </div>

      {/* TIMELINE */}

      <div className="space-y-6">
        {activities.map((activity) => (
          <ActivityTimelineItem
            key={activity.id}
            activity={activity}
          />
        ))}

        {/* EMPTY STATE */}

        {activities.length === 0 && (
          <div
            className="
              rounded-xl
              border
              border-dashed
              p-6
              text-center
              text-gray-500
            "
          >
            No recent activity found.
          </div>
        )}
      </div>
    </div>
  );
}
