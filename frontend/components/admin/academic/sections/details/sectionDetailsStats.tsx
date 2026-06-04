import { memo } from "react";

import type { Section } from "@/types/section";

import StatCard from "@/components/common/cards/statCard";

interface Props {
  section: Section;
}

function SectionDetailsStats({ section }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      <StatCard label="Violations" value={0} />
    </div>
  );
}

export default memo(SectionDetailsStats);
