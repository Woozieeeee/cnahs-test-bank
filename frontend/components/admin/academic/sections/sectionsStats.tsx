import type { Section } from "@/types/section";

interface Props {
  sections: Section[];
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

export default function SectionsStats({ sections }: Props) {
  return (
    <div
      className="
        grid
        gap-4
        md:grid-cols-2
        xl:grid-cols-5
      "
    >
      <StatCard
        label="Total Sections"
        value={sections.length}
      />

      <StatCard
        label="Total Students"
        value={sections.reduce(
          (total, section) => total + section.users.length,
          0
        )}
      />

      <StatCard
        label="Total Exams"
        value={sections.reduce(
          (total, section) => total + section.exams.length,
          0
        )}
      />

      <StatCard
        label="Archived Sections"
        value={
          sections.filter((section) => section.isArchived)
            .length
        }
      />

      <StatCard
        label="Programs"
        value={
          new Set(
            sections.map((section) => section.program)
          ).size
        }
      />
    </div>
  );
}
