"use client";

import type { ActivityLog } from "@/types/activity";

import ActivityDetailsHeader from "./activityDetailsHeader";
import ActivityDetailsGrid from "./activityDetailsGrid";
import ActivityDetailsMetadata from "./activityDetailsMetaData";

interface Props {
  activity: ActivityLog | null;

  onClose: () => void;
}

export default function ActivityDetailsModal({
  activity,
  onClose,
}: Props) {
  if (!activity) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-2xl
          bg-card
          p-6
          shadow-xl
        "
      >
        {/* HEADER */}

        <ActivityDetailsHeader
          activity={activity}
          onClose={onClose}
        />

        {/* DETAILS GRID */}

        <ActivityDetailsGrid activity={activity} />

        {/* DESCRIPTION */}

        {activity.description && (
          <div className="mt-6">
            <h3 className="font-semibold">Description</h3>

            <p className="mt-2 text-muted-foreground">
              {activity.description}
            </p>
          </div>
        )}

        {/* METADATA */}

        {activity.metadata && (
          <ActivityDetailsMetadata
            metadata={activity.metadata}
          />
        )}
      </div>
    </div>
  );
}
