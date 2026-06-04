interface Props {
  createdAt: string;
}

export default function ActivityTimelineMeta({
  createdAt,
}: Props) {
  return (
    <div className="text-muted-foreground mt-3 text-xs">
      {new Date(createdAt).toLocaleString()}
    </div>
  );
}
