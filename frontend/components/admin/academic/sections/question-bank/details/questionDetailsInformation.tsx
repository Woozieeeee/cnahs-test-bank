"use client";

import { memo } from "react";

interface Props {
  question: string;

  topic: string;

  difficulty: string;
}

function QuestionDetailsInformation({
  question,
  topic,
  difficulty,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">
        Question Information
      </h2>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-muted-foreground text-xs uppercase">
            Question
          </p>

          <p className="mt-2">{question}</p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs uppercase">
            Topic
          </p>

          <p className="mt-2">{topic}</p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs uppercase">
            Difficulty
          </p>

          <p className="mt-2">{difficulty}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(QuestionDetailsInformation);
