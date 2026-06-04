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
          className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-[11px] font-medium"
        >
          {category.replaceAll("_", " ")}
        </span>
      ))}
    </div>
  );
}
