interface Props {
  label: string;

  value: string | number;
}

export default function ExamStatCard({
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
          text-2xl
          font-bold
          text-foreground
        "
      >
        {value}
      </h2>
    </div>
  );
}
