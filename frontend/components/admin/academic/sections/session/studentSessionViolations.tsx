import { mockSessionViolations } from "@/components/admin/academic/sections/data/mockSessionViolations";

export default function StudentSessionViolations() {
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
      <h2 className="text-lg font-semibold">Violations</h2>

      <div className="mt-5 space-y-3">
        {mockSessionViolations.map((violation) => (
          <div
            key={violation.id}
            className="
                rounded-xl
                border
                border-border
                p-4
              "
          >
            <p className="font-medium">{violation.type}</p>

            <p
              className="
                  mt-1
                  text-xs
                  text-muted-foreground
                "
            >
              {violation.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
