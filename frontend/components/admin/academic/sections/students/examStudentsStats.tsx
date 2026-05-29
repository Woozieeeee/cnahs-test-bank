import ExamStudentStatCard from "./examStudentStatCard";

interface Props {
  total: number;

  active: number;

  finished: number;

  flagged: number;
}

export default function ExamStudentsStats({
  total,
  active,
  finished,
  flagged,
}: Props) {
  return (
    <div
      className="
        grid
        gap-4
        md:grid-cols-4
      "
    >
      <ExamStudentStatCard
        label="Total Sessions"
        value={total}
      />

      <ExamStudentStatCard label="Active" value={active} />

      <ExamStudentStatCard
        label="Finished"
        value={finished}
      />

      <ExamStudentStatCard
        label="Flagged"
        value={flagged}
      />
    </div>
  );
}
