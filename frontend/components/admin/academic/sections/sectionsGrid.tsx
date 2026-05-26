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
          border-slate-300
          bg-white
          p-10
          text-center
        "
      >
        <h3
          className="
            text-lg
            font-semibold
            text-slate-900
          "
        >
          No sections created
        </h3>

        <p className="mt-2 text-sm text-slate-500">
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
