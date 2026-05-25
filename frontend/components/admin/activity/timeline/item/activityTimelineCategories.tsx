interface Props {
  categories: string[];
}

export default function ActivityTimelineCategories({
  categories,
}: Props) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {categories.map((category) => (
        <span
          key={category}
          className="
            rounded-md
            bg-slate-100
            px-2
            py-1
            text-[11px]
            font-medium
            text-slate-600
          "
        >
          {category.replaceAll("_", " ")}
        </span>
      ))}
    </div>
  );
}
