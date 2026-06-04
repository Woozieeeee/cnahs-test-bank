"use client";

import { memo } from "react";

interface Props {
  title?: string;

  description?: string;
}

function SearchEmptyState({
  title = "No results found",
  description = "Try adjusting your search or filters.",
}: Props) {
  return (
    <div className="border-border bg-card flex flex-col items-center justify-center rounded-2xl border px-6 py-12 text-center">
      <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
        🔍
      </div>

      <h3 className="mt-4 text-lg font-semibold">
        {title}
      </h3>

      <p className="text-muted-foreground mt-2 max-w-md text-sm">
        {description}
      </p>
    </div>
  );
}

export default memo(SearchEmptyState);
