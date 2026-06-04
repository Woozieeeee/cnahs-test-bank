import { mockSessionTimeline } from "@/components/admin/academic/sections/data/mockSessionTimeline";

import StudentSessionTimelineItem from "./timeline/studentSessionTimelineItem";

export default function StudentSessionTimeline() {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">
        Session Timeline
      </h2>

      <p className="text-muted-foreground mt-1 text-sm">
        Complete chronological audit trail of the student's
        examination session.
      </p>

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
