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
    <div
      className="
        flex
        h-7
        w-7
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-primary
        text-xs
        font-semibold
        text-primary-foreground
      "
    >
      {initials || "A"}
    </div>
  );
}
