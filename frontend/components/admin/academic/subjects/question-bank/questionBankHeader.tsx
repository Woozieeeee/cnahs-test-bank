"use client";

import { memo } from "react";

interface Props {
  subjectName: string;
  subjectCode: string;
}

function QuestionBankHeader({
  subjectName,
  subjectCode,
}: Props) {
  return (
    <div>
      <p className="text-muted-foreground text-sm">
        Subject Question Bank
      </p>

      <h1 className="mt-1 text-3xl font-bold">
        {subjectName}
      </h1>

      <p className="text-muted-foreground mt-2 text-sm">
        {subjectCode} • Monitor question quality, difficulty
        distribution, and student performance across all
        sections.
      </p>
    </div>
  );
}

export default memo(QuestionBankHeader);
