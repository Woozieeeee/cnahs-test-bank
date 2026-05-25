import type { ActivityLog } from "@/types/activity";

import ActivityDetailItem from "./activityDetailItem";

interface Props {
  activity: ActivityLog;
}

export default function ActivityDetailsGrid({
  activity,
}: Props) {
  return (
    <div
      className="
        mt-6
        grid
        gap-4
        md:grid-cols-2
      "
    >
      <ActivityDetailItem
        label="Category"
        value={activity.categories.join(", ")}
      />

      <ActivityDetailItem
        label="Severity"
        value={activity.severity}
      />

      <ActivityDetailItem
        label="Performed By"
        value={activity.performedBy}
      />

      <ActivityDetailItem
        label="Target User"
        value={activity.targetUser || "N/A"}
      />

      <ActivityDetailItem
        label="Timestamp"
        value={new Date(
          activity.createdAt
        ).toLocaleString()}
      />
    </div>
  );
}
