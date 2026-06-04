"use client";

import { memo } from "react";

interface Props {
  id: number;

  topic: string;

  difficulty: string;
}

function QuestionDetailsHeader({
  id,
  topic,
  difficulty,
}: Props) {
  return (
    <div>
      <p className="text-muted-foreground text-sm">
        Question Details
      </p>

      <h1 className="text-3xl font-bold">Question #{id}</h1>

      <div className="mt-2 flex gap-2">
        <span className="bg-muted rounded-full px-3 py-1 text-xs font-medium">
          {topic}
        </span>

        <span className="bg-muted rounded-full px-3 py-1 text-xs font-medium">
          {difficulty}
        </span>
      </div>
    </div>
  );
}

export default memo(QuestionDetailsHeader);
