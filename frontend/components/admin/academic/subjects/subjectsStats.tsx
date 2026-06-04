interface Props {
  totalSubjects: number;

  assignedFaculty: number;

  unassignedSubjects: number;

  archivedSubjects: number;

  totalSections: number;
}

function StatCard({
  label,
  value,
}: {
  label: string;

  value: number;
}) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <p className="text-muted-foreground text-sm">
        {label}
      </p>

      <h2 className="text-foreground mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}

export default function SubjectsStats({
  totalSubjects,
  assignedFaculty,
  unassignedSubjects,
  archivedSubjects,
  totalSections,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard
        label="Total Subjects"
        value={totalSubjects}
      />

      <StatCard
        label="Assigned Faculty"
        value={assignedFaculty}
      />

      <StatCard
        label="Unassigned Subjects"
        value={unassignedSubjects}
      />

      <StatCard
        label="Active Sections"
        value={totalSections}
      />

      <StatCard
        label="Archived Subjects"
        value={archivedSubjects}
      />
    </div>
  );
}
