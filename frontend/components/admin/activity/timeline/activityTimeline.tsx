"use client";

import MotionCard from "@/components/motion/motionCard";

import ActivityTimelineContent from "./activityTimelineContent";
import ActivityTimelineEmpty from "./activityTimelineEmpty";
import ActivityTimelinePagination from "./activityTimelinePagination";
import type { ActivityLog } from "@/types/activity";
import ActivityTimelineLoading from "./activityTimelineLoading";

interface Props {
  logs: ActivityLog[];
  page: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onSelectActivity: (activity: ActivityLog) => void;
}

export default function ActivityTimeline({
  logs,
  page,
  loading,
  totalPages,
  onPageChange,
  onSelectActivity,
}: Props) {
  return (
    <MotionCard
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
      "
    >
      {loading ? (
        <ActivityTimelineLoading />
      ) : logs.length > 0 ? (
        <ActivityTimelineContent
          logs={logs}
          onSelectActivity={onSelectActivity}
        />
      ) : (
        <ActivityTimelineEmpty />
      )}

      <ActivityTimelinePagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </MotionCard>
  );
}
