import { memo } from "react";

import type { Section } from "@/types/academic/section";
import PreviewMetricCard from "./previewMetricCard";
import Link from "next/link";

interface Props {
  section: Section;
}

function SectionStudentsPreview({ section }: Props) {
  const totalStudents = section.users.length;

  // mock for now until backend supports it

  const regularStudents = Math.floor(totalStudents * 0.8);

  const irregularStudents = totalStudents - regularStudents;
  return (
    <Link
      href={`/admin/academic/sections/${section.id}/students`}
      className="block h-full"
    >
      <div className="border-border bg-card hover:border-ring flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        {/* HEADER */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-lg font-semibold">
              Students
            </h2>

            <p className="text-muted-foreground mt-1 text-sm">
              Students currently assigned to this section.
            </p>
          </div>

          <div className="bg-muted text-foreground rounded-xl px-3 py-2 text-sm font-medium">
            {section.users.length}
          </div>
        </div>

        {/* METRICS */}
        <div className="mt-6 flex-1">
          <div className="mt-6 grid grid-cols-2 gap-3">
            <PreviewMetricCard
              label="Regular"
              value={regularStudents}
            />

            <PreviewMetricCard
              label="Irregular"
              value={irregularStudents}
            />

            <PreviewMetricCard
              label="Total Students"
              value={totalStudents}
            />
          </div>
        </div>
        {/* FOOTER */}

        <div className="text-primary mt-auto pt-4 text-sm font-medium">
          View All Students Details →
        </div>
      </div>
    </Link>
  );
}

export default memo(SectionStudentsPreview);
