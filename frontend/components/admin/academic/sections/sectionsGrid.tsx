import SectionCard from "./sectionCard";

import type { Section } from "@/types/section";

interface Props {
  sections: Section[];
  onRefresh: () => void;
  onEdit: (section: Section) => void;
}

export default function SectionsGrid({
  sections,
  onRefresh,
  onEdit,
}: Props) {
  if (sections.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-border
          bg-card
          p-10
          text-center
          text-muted-foreground
        "
      >
        No sections found.
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
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
