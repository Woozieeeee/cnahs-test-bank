import { mockStudentSession } from "@/components/admin/academic/sections/data/mockStudentSession";

export default function StudentSessionOverview() {
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
      <h2 className="text-lg font-semibold">
        Session Overview
      </h2>

      <div
        className="
          mt-5
          grid
          gap-4
          md:grid-cols-2
        "
      >
        <InfoCard
          label="Student"
          value={mockStudentSession.name}
        />

        <InfoCard
          label="Student Number"
          value={mockStudentSession.studentId}
        />

        <InfoCard
          label="Section"
          value={mockStudentSession.section}
        />

        <InfoCard
          label="Status"
          value={mockStudentSession.status}
        />

        <InfoCard
          label="Progress"
          value={`${mockStudentSession.progress}%`}
        />

        <InfoCard
          label="Warnings"
          value={String(mockStudentSession.warnings)}
        />
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-xl
        bg-muted
        p-4
      "
    >
      <p
        className="
          text-xs
          uppercase
          tracking-wide
          text-muted-foreground
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          font-medium
        "
      >
        {value}
      </p>
    </div>
  );
}
