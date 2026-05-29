interface Props {
  activeStudents: number;

  completionRate: number;

  violations: number;
}

export default function SectionExamMetrics({
  activeStudents,
  completionRate,
  violations,
}: Props) {
  return (
    <div
      className="
        mt-4
        grid
        grid-cols-3
        gap-3
      "
    >
      <MetricCard label="Students" value={activeStudents} />

      <MetricCard
        label="Completion"
        value={`${completionRate}%`}
      />

      <MetricCard label="Violations" value={violations} />
    </div>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;

  value: string | number;
}) {
  return (
    <div
      className="
        rounded-xl
        bg-muted
        p-3
        text-center
      "
    >
      <p
        className="
          text-xs
          text-muted-foreground
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          font-semibold
          text-foreground
        "
      >
        {value}
      </p>
    </div>
  );
}
