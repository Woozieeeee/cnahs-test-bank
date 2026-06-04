"use client";

import { memo } from "react";

function FacultySubjectsHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Subject Management
      </h1>

      <p className="text-muted-foreground mt-2">
        Manage topics, question banks, and assessments for
        your assigned subjects.
      </p>
    </div>
  );
}

export default memo(FacultySubjectsHeader);
