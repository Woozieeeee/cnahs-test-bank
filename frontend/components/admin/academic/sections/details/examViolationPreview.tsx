import { mockExamViolations } from "@/components/admin/academic/sections/data/mockExamViolations";

export default function ExamViolationsPreview() {
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
      <h2
        className="
          text-lg
          font-semibold
        "
      >
        Recent Violations
      </h2>

      <div
        className="
          mt-5
          space-y-3
        "
      >
        {mockExamViolations.map((violation) => (
          <div
            key={violation.id}
            className="
              rounded-xl
              border
              border-border
              p-4
            "
          >
            <p className="font-medium">
              {violation.student}
            </p>

            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              {violation.type}
            </p>

            <span
              className="
                mt-2
                inline-flex
                rounded-full
                bg-red-100
                px-3
                py-1
                text-xs
                font-medium
                text-red-700
              "
            >
              {violation.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
