import type { Section } from "@/types/section";

interface Props {
  section: Section;
}

function StatCard({
  label,
  value,
}: {
  label: string;

  value: number;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-6
      "
    >
      <p
        className="
          text-sm
          text-muted-foreground
        "
      >
        {label}
      </p>

      <h2
        className="
          mt-2
          text-3xl
          font-bold
          text-foreground
        "
      >
        {value}
      </h2>
    </div>
  );
}

export default function SectionDetailsStats({
  section,
}: Props) {
  return (
    <div
      className="
        grid
        gap-4
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
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
