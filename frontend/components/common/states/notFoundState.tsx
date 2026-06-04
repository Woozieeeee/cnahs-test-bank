"use client";

import { memo } from "react";

interface Props {
  title?: string;

  description?: string;
}

function NotFoundState({
  title = "Not Found",
  description = "The requested resource could not be found.",
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border border-dashed p-10 text-center">
      <h2 className="text-foreground text-xl font-semibold">
        {title}
      </h2>

      <p className="text-muted-foreground mt-2">
        {description}
      </p>
    </div>
  );
}

export default memo(NotFoundState);
