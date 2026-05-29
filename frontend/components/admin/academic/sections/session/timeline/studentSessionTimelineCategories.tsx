interface Props {
  categories: string[];
}

export default function StudentSessionTimelineCategories({
  categories,
}: Props) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {categories.map((category) => (
        <span
          key={category}
          className="
            rounded-md
            bg-muted
            px-2
            py-1
            text-[11px]
            font-medium
            text-muted-foreground
          "
        >
          {category}
        </span>
      ))}
    </div>
  );
}
