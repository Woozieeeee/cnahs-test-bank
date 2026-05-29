interface Props {
  label: string;

  value: number;
}

export default function ExamStudentStatCard({
  label,
  value,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-5
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
