"use client";

import { memo } from "react";

interface Props {
  title?: string;

  description?: string;
}

function LoadingState({
  title = "Loading...",
  description,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-10 text-center">
      <div className="border-muted border-t-primary mx-auto h-8 w-8 animate-spin rounded-full border-2" />

      <h2 className="text-foreground mt-4 text-lg font-semibold">
        {title}
      </h2>

      {description && (
        <p className="text-muted-foreground mt-2">
          {description}
        </p>
      )}
    </div>
  );
}

export default memo(LoadingState);
