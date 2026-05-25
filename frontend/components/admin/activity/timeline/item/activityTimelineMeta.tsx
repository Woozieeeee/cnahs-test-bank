interface Props {
  category: string;

  createdAt: string;
}

export default function ActivityTimelineMeta({
  category,
  createdAt,
}: Props) {
  return (
    <div
      className="
        mt-3
        flex
        flex-wrap
        items-center
        gap-2
        text-xs
        text-slate-500
      "
    >
      <span>{category}</span>

      <span>&bull;</span>

      <span>{new Date(createdAt).toLocaleString()}</span>
    </div>
  );
}
