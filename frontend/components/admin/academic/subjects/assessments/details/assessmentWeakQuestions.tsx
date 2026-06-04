"use client";

import { memo } from "react";

import { useRouter } from "next/navigation";

interface Props {
  subjectId: number;

  questions: {
    id: number;

    question: string;

    topic: string;

    successRate: number;
  }[];
}

function AssessmentWeakQuestions({
  subjectId,
  questions,
}: Props) {
  const router = useRouter();

  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">
        Weakest Questions
      </h2>

      <div className="mt-4 space-y-3">
        {questions.length === 0 ? (
          <div className="border-border rounded-xl border border-dashed p-4">
            <p className="text-muted-foreground text-sm">
              No question analytics available yet.
            </p>
          </div>
        ) : (
          questions.map((question) => (
            <div
              key={question.id}
              onClick={() =>
                router.push(
                  `/admin/academic/subjects/${subjectId}/question-bank/${question.id}`
                )
              }
              className="border-border hover:bg-muted/50 cursor-pointer rounded-xl border p-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">
                    {question.question}
                  </p>

                  <p className="text-muted-foreground mt-1 text-xs">
                    #{question.id} • {question.topic}
                  </p>
                </div>

                <span className="font-semibold">
                  {question.successRate}%
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default memo(AssessmentWeakQuestions);
