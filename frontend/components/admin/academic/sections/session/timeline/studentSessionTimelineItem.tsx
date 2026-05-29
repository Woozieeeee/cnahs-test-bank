import MotionCard from "@/components/motion/motionCard";

import StudentSessionTimelineDot from "./studentSessionTimelineDot";
import StudentSessionTimelineCategories from "./studentSessionTimelineCategories";
import StudentSessionTimelineHeader from "./studentSessionTimelineHeader";

interface Props {
  event: {
    id: number;

    title: string;

    description: string;

    severity: string;

    categories: string[];

    createdAt: string;
  };

  isLast?: boolean;
}

export default function StudentSessionTimelineItem({
  event,
  isLast = false,
}: Props) {
  const severityColor =
    event.severity === "ERROR"
      ? "bg-red-500"
      : event.severity === "WARNING"
        ? "bg-yellow-500"
        : "bg-green-500";

  const isViolation =
    event.categories.includes("VIOLATION");

  const isHighSeverity = event.severity === "ERROR";

  return (
    <div className="grid grid-cols-[84px_28px_1fr] gap-4">
      {/* TIME */}

      <div
        className="
          pt-5
          text-right
          text-sm
          text-muted-foreground
        "
      >
        {new Date(event.createdAt).toLocaleTimeString()}
      </div>

      {/* TIMELINE DOT */}

      <StudentSessionTimelineDot
        severityColor={severityColor}
        isLast={isLast}
      />

      {/* CARD */}

      <MotionCard>
        <div
          className={`
            rounded-xl border-4 border-red-500 p-5
            transition-all

            ${
              isViolation
                ? `
                  border-red-200
                  bg-red-50/50
                `
                : isHighSeverity
                  ? `
                    border-amber-200
                    bg-amber-50/40
                  `
                  : `
                    border-slate-200
                    bg-muted/30
                  `
            }
          `}
        >
          <div className="min-w-0 flex-1">
            {/* TITLE */}

            <StudentSessionTimelineHeader
              title={event.title}
              severity={event.severity}
            />

            {/* DESCRIPTION */}

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-muted-foreground
              "
            >
              {event.description}
            </p>

            {/* CATEGORIES */}

            <StudentSessionTimelineCategories
              categories={event.categories}
            />

            {/* META */}

            <div
              className="
                mt-3
                text-xs
                text-muted-foreground
              "
            >
              {new Date(event.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </MotionCard>
    </div>
  );
}
