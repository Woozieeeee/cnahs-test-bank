"use client";

import { memo, useState } from "react";

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

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(
    questions.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentQuestions = questions.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          <>
            {currentQuestions.map((question) => (
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
            ))}

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() =>
                    handlePageChange(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  className="text-muted-foreground hover:text-foreground text-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from(
                    { length: totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`rounded-md px-3 py-1 text-sm ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    handlePageChange(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className="text-muted-foreground hover:text-foreground text-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default memo(AssessmentWeakQuestions);
