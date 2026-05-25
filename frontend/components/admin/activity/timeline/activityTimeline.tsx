"use client";

import MotionCard from "@/components/motion/motionCard";

import ActivityTimelineContent from "./activityTimelineContent";
import ActivityTimelineEmpty from "./activityTimelineEmpty";
import ActivityTimelinePagination from "./activityTimelinePagination";

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
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSelectActivity: (activity: ActivityLog) => void;
}

export default function ActivityTimeline({
  logs,
  page,
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
      {logs.length > 0 ? (
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
