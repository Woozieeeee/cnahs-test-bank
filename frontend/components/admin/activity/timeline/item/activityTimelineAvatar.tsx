interface Props {
  performedBy: string;
}

export default function ActivityTimelineAvatar({
  performedBy,
}: Props) {
  const initials = performedBy
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-primary text-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
      {initials || "A"}
    </div>
  );
}
