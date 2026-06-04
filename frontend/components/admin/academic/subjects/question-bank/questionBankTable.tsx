"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";

import SearchEmptyState from "@/components/common/search/searchEmptyState";

interface Question {
  id: number;
  topic: string;
  difficulty: string;
  successRate: number;
  attempts: number;
}

interface Props {
  subjectId: number;
  questions: Question[];
}

function QuestionBankTable({
  subjectId,
  questions,
}: Props) {
  const router = useRouter();

  if (!questions.length) {
    return (
      <SearchEmptyState
        title="No questions found"
        description="Try adjusting your filters."
      />
    );
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-border border-b">
              <th className="p-4 text-left">ID</th>

              <th className="p-4 text-left">Topic</th>

              <th className="p-4 text-left">Difficulty</th>

              <th className="p-4 text-left">Success</th>

              <th className="p-4 text-left">Attempts</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((question) => (
              <tr
                key={question.id}
                onClick={() =>
                  router.push(
                    `/admin/academic/subjects/${subjectId}/question-bank/${question.id}`
                  )
                }
                className="border-border hover:bg-muted/50 cursor-pointer border-b transition-colors"
              >
                <td className="p-4">#{question.id}</td>

                <td className="p-4">{question.topic}</td>

                <td className="p-4">
                  {question.difficulty}
                </td>

                <td className="p-4">
                  {question.successRate}%
                </td>

                <td className="p-4">{question.attempts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(QuestionBankTable);
