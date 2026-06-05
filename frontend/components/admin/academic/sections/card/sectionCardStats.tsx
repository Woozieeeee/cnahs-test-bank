import { memo } from "react";

import type { Section } from "@/types/academic/section";

interface Props {
  section: Section;
}

const statCardClassName = `
  rounded-xl
  bg-muted
  p-4
`;

const labelClassName = `
  text-sm
  text-muted-foreground
`;

const valueClassName = `
  mt-2
  text-2xl
  font-bold
  text-foreground
`;

function SectionCardStats({ section }: Props) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <div className={statCardClassName}>
        <p className={labelClassName}>Students</p>

        <p className={valueClassName}>
          {section.users.length}
        </p>
      </div>

      <div className={statCardClassName}>
        <p className={labelClassName}>Exams</p>

        <p className={valueClassName}>
          {section.exams.length}
        </p>
      </div>
    </div>
  );
}

export default memo(SectionCardStats);
