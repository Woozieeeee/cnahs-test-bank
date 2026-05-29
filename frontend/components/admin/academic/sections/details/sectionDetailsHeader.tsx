"use client";

import type { Section } from "@/types/section";

import BackButton from "@/components/common/backButton";

import PageHeader from "@/components/layout/pages/pageHeader";

import PageTitle from "@/components/layout/pages/pageTitle";

interface Props {
  section: Section;
}

export default function SectionDetailsHeader({
  section,
}: Props) {
  return (
    <div className="space-y-6">
      <PageHeader>
        <PageTitle
          title={section.name}
          description={`${section.program} • Year ${section.yearLevel}`}
        >
          <BackButton
            href="/admin/academic/sections"
            label="Back to Sections"
          />
        </PageTitle>

        {section.isArchived && (
          <div
            className="
              rounded-full
              bg-red-100
              px-4
              py-2
              text-sm
              font-medium
              text-red-700
            "
          >
            Archived
          </div>
        )}
      </PageHeader>

      {/* METRICS */}

      <div
        className="
          grid
          gap-4
          md:grid-cols-3
        "
      >
        <MetadataCard
          label="Students"
          value={String(section.users.length)}
        />

        <MetadataCard
          label="Subjects"
          value={String(section.sectionSubjects.length)}
        />

        <MetadataCard
          label="Exams"
          value={String(section.exams.length)}
        />
      </div>
    </div>
  );
}

function MetadataCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-5
      "
    >
      <p
        className="
          text-xs
          uppercase
          tracking-wide
          text-muted-foreground
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-2xl
          font-bold
          text-foreground
        "
      >
        {value}
      </p>
    </div>
  );
}
