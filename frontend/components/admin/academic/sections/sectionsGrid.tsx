"use client";

import { memo } from "react";

import type { Section } from "@/types/section";

import EmptyState from "@/components/common/states/emptyState";

import SectionCard from "./sectionCard";

interface Props {
  sections: Section[];

  onRefresh: () => void;

  onEdit: (section: Section) => void;
}

function SectionsGrid({
  sections,
  onRefresh,
  onEdit,
}: Props) {
  if (sections.length === 0) {
    <EmptyState
      title="No sections found."
      description="Try creating a new section or adjusting your filters."
    />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {sections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          onRefresh={onRefresh}
          onEdit={() => onEdit(section)}
        />
      ))}
    </div>
  );
}

export default memo(SectionsGrid);
