import { memo, useMemo } from "react";

import type { Section } from "@/types/academic/section";
import PreviewMetricCard from "./previewMetricCard";
import Link from "next/link";

interface Props {
  section: Section;
}

function SectionExamsPreview({ section }: Props) {
  const totalExams = section.exams.length;

  const ongoingExams = section.exams.filter(
    (exam) => exam.status === "ONGOING"
  ).length;

  const completedExams = section.exams.filter(
    (exam) => exam.status === "COMPLETED"
  ).length;

  const scheduledExams = section.exams.filter(
    (exam) => exam.status === "SCHEDULED"
  ).length;

  const archivedExams = section.exams.filter(
    (exam) => exam.status === "ARCHIVED"
  ).length;
  return (
    <Link
      href={`/admin/academic/sections/${section.id}/exams`}
      className="block h-full"
    >
      <div className="border-border bg-card hover:border-ring flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        {/* HEADER */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-lg font-semibold">
              Exams
            </h2>

            <p className="text-muted-foreground mt-1 text-sm">
              Recent and active exams for this section.
            </p>
          </div>

          <div className="bg-muted text-foreground rounded-xl px-3 py-2 text-sm font-medium">
            {section.exams.length}
          </div>
        </div>

        {/* METRICS */}
        <div className="mt-6 flex-1">
          <div className="mt-6 grid grid-cols-2 gap-3">
            <PreviewMetricCard
              label="Ongoing"
              value={ongoingExams}
            />

            <PreviewMetricCard
              label="Scheduled"
              value={scheduledExams}
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <PreviewMetricCard
              label="Completed"
              value={completedExams}
            />

            <PreviewMetricCard
              label="Archived"
              value={archivedExams}
            />
          </div>
        </div>
        {/* FOOTER */}

        <div className="text-primary mt-auto pt-4 text-sm font-medium">
          View All Exams Details →
        </div>
      </div>
    </Link>
  );
}

export default memo(SectionExamsPreview);
