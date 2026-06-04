"use client";

import { memo } from "react";

interface Props {
  code: string;

  name: string;

  description?: string | null;
}

function FacultySubjectHeader({
  code,
  name,
  description,
}: Props) {
  return (
    <div>
      <p className="text-muted-foreground text-sm">
        Subject Management
      </p>

      <h1 className="mt-1 text-3xl font-bold">
        {code} · {name}
      </h1>

      <p className="text-muted-foreground mt-2">
        {description || "No description provided."}
      </p>
    </div>
  );
}

export default memo(FacultySubjectHeader);
