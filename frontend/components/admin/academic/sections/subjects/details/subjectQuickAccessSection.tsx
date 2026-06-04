"use client";

import { memo } from "react";

import Link from "next/link";

interface Props {
  sectionId: number;

  subjectId: number;
}

function SubjectQuickAccessSection({
  sectionId,
  subjectId,
}: Props) {
  return (
    <div className="border-border border-t p-8">
      <h3 className="text-lg font-semibold">
        Quick Access
      </h3>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Link
          href={`/admin/academic/sections/${sectionId}/subjects/${subjectId}/assessments`}
          className="group"
        >
          <div className="border-border bg-card hover:border-primary hover:bg-primary/5 flex items-center justify-between rounded-2xl border px-6 py-5 transition-all duration-200 hover:shadow-sm">
            <div>
              <h4 className="text-foreground font-semibold">
                Assessments
              </h4>

              <p className="text-muted-foreground mt-1 text-sm">
                View assessment analytics and results.
              </p>
            </div>

            <span className="text-xl transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </Link>

        <Link
          href={`/admin/academic/sections/${sectionId}/subjects/${subjectId}/questions`}
          className="group"
        >
          <div className="border-border bg-card hover:border-primary hover:bg-primary/5 flex items-center justify-between rounded-2xl border px-6 py-5 transition-all duration-200 hover:shadow-sm">
            <div>
              <h4 className="text-foreground font-semibold">
                Question Bank
              </h4>

              <p className="text-muted-foreground mt-1 text-sm">
                View question performance and topics.
              </p>
            </div>

            <span className="text-xl transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default memo(SubjectQuickAccessSection);
