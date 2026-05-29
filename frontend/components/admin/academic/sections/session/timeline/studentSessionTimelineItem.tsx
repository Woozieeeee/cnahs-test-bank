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
    <div
      className="
      grid
      grid-cols-[84px_28px_1fr]
      gap-4
      pb-6
    "
    >
      {/* TIME */}

      <div
        className="
        pt-5
        text-right
        text-sm
        text-muted-foreground
      "
      >
        {new Date(event.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
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
          rounded-2xl
          border
          bg-card
          p-5
          transition-all
          hover:-translate-y-0.5
          hover:shadow-sm

          ${
            isViolation
              ? "border-red-200/70"
              : isHighSeverity
                ? "border-amber-200/70"
                : "border-border/60"
          }
        `}
        >
          <div className="min-w-0 flex-1">
            {/* HEADER */}

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
              mt-4
              border-t
              border-border/50
              pt-3
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
