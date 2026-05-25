import SectionCard from "./sectionCard";

import type { Section } from "@/types/section";

interface Props {
  sections: Section[];
}

export default function SectionsGrid({ sections }: Props) {
  if (sections.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-slate-200
          bg-white
          p-10
          text-center
          text-slate-500
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
        <SectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}
