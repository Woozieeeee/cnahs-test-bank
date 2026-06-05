"use client";

import EmptyState from "@/components/common/states/emptyState";

import { FacultyQuestion } from "@/types/facultyQuestion";

import QuestionRowActions from "./questionRowActions";

import DifficultyBadge from "@/components/common/badges/difficultyBadge";

interface Props {
  questions: FacultyQuestion[];

  onEdit: (question: FacultyQuestion) => void;

  onArchive: (questionId: number) => void;

  onRestore: (questionId: number) => void;
}

export default function QuestionTable({
  questions,
  onEdit,
  onArchive,
  onRestore,
}: Props) {
  if (questions.length === 0) {
    return (
      <EmptyState
        title="No questions found"
        description="Create your first question to begin building your question bank."
      />
    );
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-border bg-muted/30 border-b text-sm">
              <th className="p-4 text-left font-medium">
                Question
              </th>

              <th className="p-4 text-left font-medium">
                Difficulty
              </th>

              <th className="p-4 text-left font-medium">
                Correct Answer
              </th>

              <th className="p-4 text-left font-medium">
                Accuracy
              </th>

              <th className="p-4 text-left font-medium">
                Status
              </th>

              <th className="p-4 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {questions.map((question) => {
              const accuracy =
                question.totalAttempts === 0
                  ? 0
                  : Math.round(
                      (question.totalCorrect /
                        question.totalAttempts) *
                        100
                    );

              return (
                <tr
                  key={question.id}
                  className="border-border hover:bg-muted/30 border-b transition"
                >
                  <td className="w-125 max-w-125 p-4">
                    <div>
                      <p
                        className="line-clamp-2 font-medium"
                        title={question.question}
                      >
                        {question.question}
                      </p>

                      {question.explanation && (
                        <p
                          className="text-muted-foreground mt-1 line-clamp-1 text-xs"
                          title={question.explanation}
                        >
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    <DifficultyBadge
                      difficulty={question.difficulty}
                    />
                  </td>

                  <td className="p-4">
                    <div className="max-w-50 truncate font-medium">
                      {question.correctAnswer}
                    </div>
                  </td>

                  <td className="p-4">
                    <div>
                      <p className="font-medium">
                        {accuracy}%
                      </p>

                      <p className="text-muted-foreground text-xs">
                        {question.totalAttempts} attempts
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        question.isArchived
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {question.isArchived
                        ? "Archived"
                        : "Active"}
                    </span>
                  </td>

                  <td className="p-4">
                    <QuestionRowActions
                      archived={question.isArchived}
                      onEdit={() => onEdit(question)}
                      onArchive={() =>
                        onArchive(question.id)
                      }
                      onRestore={() =>
                        onRestore(question.id)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
