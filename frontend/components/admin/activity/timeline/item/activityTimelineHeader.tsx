import ActivityTimelineAvatar from "./activityTimelineAvatar";

import ActivityViolationBadge from "../../activityViolationBadge";

import { ACTIVITY_ICONS } from "@/lib/constants/activityIcons";

import type { ActivityLog } from "@/types/activity";

interface Props {
  activity: ActivityLog;

  isViolation: boolean;
}

export default function ActivityTimelineHeader({
  activity,
  isViolation,
}: Props) {
  const PrimaryIcon =
    ACTIVITY_ICONS[
      activity.categories[0] as keyof typeof ACTIVITY_ICONS
    ];

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-2
        text-sm
        text-slate-700
      "
    >
      {/* ICON */}

      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-slate-900
          text-white
        "
      >
        {PrimaryIcon ? (
          <PrimaryIcon size={16} />
        ) : (
          <ActivityTimelineAvatar
            performedBy={activity.performedBy}
          />
        )}
      </div>

      {/* USER */}

      <span className="font-semibold text-slate-900">
        {activity.performedBy}
      </span>

      {/* ACTION */}

      <div className="flex flex-wrap items-center gap-2">
        <span>{activity.action}</span>

        <ActivityViolationBadge visible={isViolation} />
      </div>

      {/* TARGET */}

      {activity.targetUser && (
        <span
          className="
            rounded-md
            bg-slate-200
            px-2
            py-0.5
            font-medium
            text-slate-700
          "
        >
          {activity.targetUser}
        </span>
      )}
    </div>
  );
}
