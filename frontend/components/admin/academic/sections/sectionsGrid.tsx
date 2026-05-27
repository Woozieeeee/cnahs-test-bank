import SectionCard from "./sectionCard";

import type { Section } from "@/types/section";

interface Props {
  sections: Section[];
}

export default function SectionsGrid({ sections }: Props) {
  // =========================
  // EMPTY STATE
  // =========================

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
        "
      >
        <h3
          className="
            text-lg
            font-semibold
            text-foreground
          "
        >
          No sections created
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first academic section to get started.
        </p>
      </div>
    );
  }

  // =========================
  // GRID
  // =========================

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
        <SectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}
