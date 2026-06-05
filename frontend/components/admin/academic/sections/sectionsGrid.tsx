"use client";

import { memo } from "react";

import type { Section } from "@/types/academic/section";

import EmptyState from "@/components/common/states/emptyState";

import SectionCard from "./sectionCard";

interface Props {
  sections: Section[];

  onArchiveSuccess: (sectionId: number) => void;

  onRestoreSuccess: (sectionId: number) => void;

  onEdit: (section: Section) => void;
}

function SectionsGrid({
  sections,
  onArchiveSuccess,
  onRestoreSuccess,
  onEdit,
}: Props) {
  if (sections.length === 0) {
    return (
      <EmptyState
        title="No sections found."
        description="Try creating a new section or adjusting your filters."
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {sections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          onArchiveSuccess={onArchiveSuccess}
          onRestoreSuccess={onRestoreSuccess}
          onEdit={() => onEdit(section)}
        />
      ))}
    </div>
  );
}

export default memo(SectionsGrid);
