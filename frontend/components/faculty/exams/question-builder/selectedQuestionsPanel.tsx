"use client";

import { memo, useEffect, useMemo, useState } from "react";

import Pagination from "@/components/common/pagination";
import MotionButton from "@/components/motion/motionButton";

import { ArrowUp, ArrowDown, X } from "lucide-react";

interface SelectedQuestion {
  id: number;

  question: string;

  topicName: string;

  difficulty: string;
}

interface Props {
  questions: SelectedQuestion[];

  questionLimit: number;

  onMoveUp: (questionId: number) => void;

  onMoveDown: (questionId: number) => void;

  onRemove: (questionId: number) => void;
}

const PAGE_SIZE = 10;

function SelectedQuestionsPanel({
  questions,
  questionLimit,
  onMoveUp,
  onMoveDown,
  onRemove,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(questions.length / PAGE_SIZE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return questions.slice(start, start + PAGE_SIZE);
  }, [questions, currentPage]);

  return (
    <div className="border-border bg-card rounded-2xl border">
      <div className="border-border border-b p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">
              Selected Questions
            </h2>

            <p className="text-muted-foreground mt-1 text-sm">
              {questions.length} / {questionLimit} selected
            </p>

            <p className="text-muted-foreground text-xs">
              {questionLimit - questions.length} remaining
            </p>

            {questions.length === questionLimit ? (
              <p className="mt-1 text-xs font-medium text-green-600">
                Question selection complete
              </p>
            ) : (
              <p className="mt-1 text-xs font-medium text-amber-500">
                Select exactly {questionLimit} questions to
                continue
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex h-[650px] flex-col">
        {questions.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                No questions selected.
              </p>

              <p className="text-muted-foreground mt-1 text-xs">
                Add questions from the available list.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {paginatedQuestions.map((question, index) => {
                const globalIndex =
                  (currentPage - 1) * PAGE_SIZE + index;

                const isFirst = globalIndex === 0;

                const isLast =
                  globalIndex === questions.length - 1;

                return (
                  <div
                    key={question.id}
                    className="group border-border hover:bg-muted/30 border-b p-4 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-muted-foreground mb-1 text-xs">
                          #{globalIndex + 1}
                        </p>

                        <p
                          className="line-clamp-2 font-medium"
                          title={question.question}
                        >
                          {question.question}
                        </p>

                        <div className="text-muted-foreground mt-2 flex flex-wrap gap-2 text-xs">
                          <span className="bg-muted rounded-md px-2 py-1">
                            {question.topicName}
                          </span>

                          <span className="bg-muted rounded-md px-2 py-1">
                            {question.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <MotionButton
                          title="Move Up"
                          disabled={isFirst}
                          onClick={() =>
                            onMoveUp(question.id)
                          }
                          className={`rounded-lg p-2 ${
                            isFirst
                              ? "cursor-not-allowed opacity-40"
                              : "hover:bg-muted"
                          }`}
                        >
                          <ArrowUp size={16} />
                        </MotionButton>

                        <MotionButton
                          title="Move Down"
                          disabled={isLast}
                          onClick={() =>
                            onMoveDown(question.id)
                          }
                          className={`rounded-lg p-2 ${
                            isLast
                              ? "cursor-not-allowed opacity-40"
                              : "hover:bg-muted"
                          }`}
                        >
                          <ArrowDown size={16} />
                        </MotionButton>

                        <MotionButton
                          title="Remove Question"
                          onClick={() =>
                            onRemove(question.id)
                          }
                          className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
                        >
                          <X size={16} />
                        </MotionButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-border border-t p-3">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(SelectedQuestionsPanel);
