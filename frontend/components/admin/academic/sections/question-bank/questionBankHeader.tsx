"use client";

import { memo } from "react";

function QuestionBankHeader() {
  return (
    <div>
      <p className="text-muted-foreground text-sm">
        Question Bank
      </p>

      <h1 className="text-3xl font-bold">
        Question Performance Analytics
      </h1>

      <p className="text-muted-foreground mt-1 text-sm">
        Analyze question performance, difficulty
        distribution, topic mastery, and student knowledge
        gaps.
      </p>
    </div>
  );
}

export default memo(QuestionBankHeader);
