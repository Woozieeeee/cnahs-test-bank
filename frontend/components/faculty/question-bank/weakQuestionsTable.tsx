"use client";

import { memo, useMemo, useState } from "react";

import Pagination from "@/components/common/pagination";

import DifficultyBadge from "@/components/common/badges/difficultyBadge";

interface WeakQuestion {
  id: number;

  question: string;

  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  totalAttempts: number;

  totalCorrect: number;

  successRate: number;
}

interface Props {
  questions: WeakQuestion[];
}

function WeakQuestionsTable({ questions }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const totalPages =
    Math.ceil(questions.length / ITEMS_PER_PAGE) || 1;

  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return questions.slice(start, start + ITEMS_PER_PAGE);
  }, [questions, currentPage]);

  return (
    <div className="border-border bg-card mt-6 overflow-hidden rounded-2xl border">
      <div className="border-border border-b p-5">
        <h2 className="font-semibold">
          Challenging Questions
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Questions with low student success rates.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-border bg-muted/30 border-b">
              <th className="p-4 text-left">Question</th>

              <th className="p-4 text-left">Difficulty</th>

              <th className="p-4 text-left">Attempts</th>

              <th className="p-4 text-left">Correct</th>

              <th className="p-4 text-left">
                Success Rate
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedQuestions.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-muted-foreground p-8 text-center"
                >
                  No weak questions detected.
                </td>
              </tr>
            ) : (
              paginatedQuestions.map((question) => (
                <tr
                  key={question.id}
                  className="border-border hover:bg-muted/30 border-b"
                >
                  <td className="w-125 max-w-125 p-4">
                    <p
                      className="line-clamp-2"
                      title={question.question}
                    >
                      {question.question}
                    </p>
                  </td>

                  <td className="p-4">
                    <DifficultyBadge
                      difficulty={question.difficulty}
                    />
                  </td>

                  <td className="p-4">
                    {question.totalAttempts}
                  </td>

                  <td className="p-4">
                    {question.totalCorrect}
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-red-500">
                      {question.successRate}%
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {questions.length > ITEMS_PER_PAGE && (
        <div className="p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export default memo(WeakQuestionsTable);
