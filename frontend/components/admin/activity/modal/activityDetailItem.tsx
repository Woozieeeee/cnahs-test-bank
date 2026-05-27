interface Props {
  label: string;

  value: string;
}

export default function ActivityDetailItem({
  label,
  value,
}: Props) {
  return (
    <div
      className="
        rounded-xl
        bg-muted/30
        p-4
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

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
