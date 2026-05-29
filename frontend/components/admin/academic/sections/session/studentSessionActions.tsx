import { mockSessionTimeline } from "@/components/admin/academic/sections/data/mockSessionTimeline";

import StudentSessionTimelineItem from "./timeline/studentSessionTimelineItem";

export default function StudentSessionTimeline() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-6
      "
    >
      <h2 className="text-lg font-semibold">
        Session Timeline
      </h2>

      <div className="mt-6">
        {mockSessionTimeline.map((event, index) => (
          <StudentSessionTimelineItem
            key={event.id}
            event={event}
            isLast={
              index === mockSessionTimeline.length - 1
            }
          />
        ))}
      </div>
    </div>
  );
}
