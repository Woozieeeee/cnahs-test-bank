import ExamStatCard from "./examStatCard";

interface Props {
  difficulty: string;

  duration: number;

  activeStudents: number;

  violations: number;
}

export default function ExamDetailsStats({
  difficulty,
  duration,
  activeStudents,
  violations,
}: Props) {
  return (
    <div
      className="
        grid
        gap-4
        md:grid-cols-4
      "
    >
      <ExamStatCard label="Difficulty" value={difficulty} />

      <ExamStatCard
        label="Duration"
        value={`${duration} mins`}
      />

      <ExamStatCard
        label="Active Students"
        value={activeStudents}
      />

      <ExamStatCard label="Violations" value={violations} />
    </div>
  );
}
