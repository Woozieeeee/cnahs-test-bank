"use client";

import { memo, useMemo, useState } from "react";

import Pagination from "@/components/common/pagination";
import MotionButton from "@/components/motion/motionButton";

import type { ExamBuilderQuestion } from "@/types/exams/createExam";

interface Props {
  questions: ExamBuilderQuestion[];

  selectedQuestionIds: number[];

  questionLimit: number;

  selectedCount: number;

  onAdd: (question: ExamBuilderQuestion) => void;
}

const PAGE_SIZE = 10;

function AvailableQuestionsPanel({
  questions,
  selectedQuestionIds,
  selectedCount,
  questionLimit,
  onAdd,
}: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(questions.length / PAGE_SIZE)
  );

  const paginatedQuestions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return questions.slice(start, start + PAGE_SIZE);
  }, [questions, page]);

  return (
    <div className="border-border bg-card rounded-2xl border">
      {/* HEADER */}

      <div className="border-border border-b p-5">
        <h2 className="font-semibold">
          Available Questions
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          {questions.length} available questions
        </p>
      </div>

      {/* CONTENT */}

      <div className="flex h-162.5 flex-col">
        <div className="flex-1 overflow-y-auto">
          {paginatedQuestions.length === 0 ? (
            <div className="text-muted-foreground p-10 text-center">
              No questions available.
            </div>
          ) : (
            paginatedQuestions.map((question) => {
              const isSelected =
                selectedQuestionIds.includes(question.id);

              const limitReached =
                selectedCount >= questionLimit;

              return (
                <div
                  key={question.id}
                  className={`border-border border-b p-4 transition ${
                    isSelected || limitReached
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p
                        className="line-clamp-2 font-medium"
                        title={question.question}
                      >
                        {question.question}
                      </p>

                      <div className="text-muted-foreground mt-2 flex gap-3 text-xs">
                        <span>{question.topicName}</span>

                        <span>{question.difficulty}</span>
                      </div>
                    </div>

                    {isSelected ? (
                      <span className="text-muted-foreground text-xs font-medium">
                        Added
                      </span>
                    ) : limitReached ? (
                      <span className="text-muted-foreground text-xs font-medium">
                        Full
                      </span>
                    ) : (
                      <MotionButton
                        onClick={() => onAdd(question)}
                        className="bg-primary text-primary-foreground rounded-lg px-3 py-1 text-sm"
                      >
                        Add
                      </MotionButton>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* PAGINATION */}

        <div className="border-border border-t p-3">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(AvailableQuestionsPanel);
