interface Props {
  label: string;

  field: string;

  sortField: string;

  sortOrder: "asc" | "desc";

  onSort: (
    field: string,

    order: "asc" | "desc"
  ) => void;
}

export default function SortableTableHeader({
  label,

  field,

  sortField,

  sortOrder,

  onSort,
}: Props) {
  const isActive = sortField === field;

  return (
    <th className="px-6 py-4">
      <button
        onClick={() =>
          onSort(
            field,

            isActive && sortOrder === "asc" ? "desc" : "asc"
          )
        }
        className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-semibold transition"
      >
        {label}

        {isActive && (
          <span className="text-xs">
            {sortOrder === "asc" ? "↑" : "↓"}
          </span>
        )}
      </button>
    </th>
  );
}
