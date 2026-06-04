"use client";

import type { Section } from "@/types/section";

import BackButton from "@/components/common/backButton";

import StatusBadge from "@/components/common/badges/statusBadge";

import StatCard from "@/components/common/cards/statCard";

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
          description={`Full Details of ${section.program} • Year ${section.yearLevel}`}
        >
          <BackButton
            href="/admin/academic/sections"
            label="Back to Sections"
          />
        </PageTitle>

        {section.isArchived && (
          <StatusBadge variant="danger">
            Archived
          </StatusBadge>
        )}
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-5">
        <StatCard label="Program" value={section.program} />

        <StatCard
          label="Year Level"
          value={`${section.yearLevel}`}
        />

        <StatCard
          label="Students"
          value={section.users.length}
        />

        <StatCard
          label="Subjects"
          value={section.sectionSubjects.length}
        />

        <StatCard
          label="Exams"
          value={section.exams.length}
        />
      </div>
    </div>
  );
}
