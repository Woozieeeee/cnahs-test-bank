"use client";

import { memo } from "react";

import Link from "next/link";
import PreviewMetricCard from "./previewMetricCard";
import type { Section } from "@/types/section";
import { mockSectionSubjects } from "../data/mockSectionSubjects";

interface Props {
  section: Section;
}

function SectionSubjectsPreview({ section }: Props) {
  const subjects =
    section.sectionSubjects.length > 0
      ? section.sectionSubjects
      : mockSectionSubjects;

  const totalSubjects = subjects.length;

  const totalFaculty = new Set(
    subjects
      .filter((item) => item.subject.faculty)
      .map((item) => item.subject.faculty?.name)
  ).size;
  return (
    <Link
      href={`/admin/academic/sections/${section.id}/subjects`}
      className="block h-full"
    >
      <div className="border-border bg-card hover:border-ring flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        {/* HEADER */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-lg font-semibold">
              Subjects
            </h2>

            <p className="text-muted-foreground mt-1 text-sm">
              Subjects assigned to this section.
            </p>
          </div>

          <div className="bg-muted text-foreground rounded-xl px-3 py-2 text-sm font-medium">
            {section.sectionSubjects.length}
          </div>
        </div>

        {/* METRICS */}
        <div className="mt-6 flex-1">
          <div className="mt-6 grid grid-cols-2 gap-3">
            <PreviewMetricCard
              label="Subjects"
              value={totalSubjects}
            />

            <PreviewMetricCard
              label="Faculty"
              value={totalFaculty}
            />
          </div>
        </div>

        {/* FOOTER */}

        <div className="text-primary mt-auto pt-4 text-sm font-medium">
          View All Subjects Details →
        </div>
      </div>
    </Link>
  );
}

export default memo(SectionSubjectsPreview);
