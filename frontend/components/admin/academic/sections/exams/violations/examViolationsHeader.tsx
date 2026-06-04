"use client";

import { memo } from "react";

function ExamViolationsHeader() {
  return (
    <div>
      <p className="text-muted-foreground text-sm">
        Exam Violations
      </p>

      <h1 className="text-3xl font-bold">
        Violation Timeline
      </h1>

      <p className="text-muted-foreground mt-1 text-sm">
        Chronological record of detected examination
        violations.
      </p>
    </div>
  );
}

export default memo(ExamViolationsHeader);
