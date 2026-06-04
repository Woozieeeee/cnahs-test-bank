interface Props {
  label: string;

  value: string;
}

export default function ActivityDetailItem({
  label,
  value,
}: Props) {
  return (
    <div className="bg-muted/30 rounded-xl p-4">
      <p className="text-muted-foreground text-sm">
        {label}
      </p>

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
