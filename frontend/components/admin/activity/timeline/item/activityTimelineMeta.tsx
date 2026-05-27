interface Props {
  createdAt: string;
}

export default function ActivityTimelineMeta({
  createdAt,
}: Props) {
  return (
    <div
      className="
        mt-3
        text-xs
        text-muted-foreground
      "
    >
      {new Date(createdAt).toLocaleString()}
    </div>
  );
}
