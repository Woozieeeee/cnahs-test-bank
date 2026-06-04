"use client";

import { memo } from "react";

interface Violation {
  id: number;

  student: string;

  type: string;

  timestamp: string;
}

interface Props {
  violations: Violation[];
}

function AssessmentDetailsViolations({
  violations,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Violations
        </h2>
      </div>

      <div className="border-border bg-card rounded-2xl border">
        {violations.map((violation) => (
          <div
            key={violation.id}
            className="border-border border-b p-4"
          >
            <p className="font-medium">
              {violation.student}
            </p>

            <p className="text-muted-foreground text-sm">
              {violation.type}
            </p>

            <p className="text-muted-foreground mt-1 text-xs">
              {violation.timestamp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default memo(AssessmentDetailsViolations);
