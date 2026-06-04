"use client";

import { memo } from "react";

interface Props {
  sections: {
    section: string;
    score: number;
  }[];
}

function SubjectSectionPerformance({ sections }: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <div>
        <h2 className="text-lg font-semibold">
          Section Performance
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Compare subject performance across enrolled
          sections.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {sections.map((section) => (
          <div
            key={section.section}
            className="border-border flex items-center justify-between rounded-xl border p-4"
          >
            <span className="font-medium">
              {section.section}
            </span>

            <span className="font-semibold">
              {section.score}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(SubjectSectionPerformance);
