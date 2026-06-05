"use client";

import { memo, useState } from "react";

import ModalContainer from "@/components/common/modal/modalContainer";
import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";

import { errorToast } from "@/lib/swal";

interface Props {
  open: boolean;

  onClose: () => void;

  onContinue: (data: {
    questionLimit: number;

    difficultyMode:
      | "EASY"
      | "MEDIUM"
      | "HARD"
      | "EXPERT"
      | "MIXED";
  }) => void;
}

function CreateExamSetupModal({
  open,
  onClose,
  onContinue,
}: Props) {
  const [questionLimit, setQuestionLimit] = useState(10);

  const [customQuestionLimit, setCustomQuestionLimit] =
    useState("");

  const [difficultyMode, setDifficultyMode] = useState<
    "EASY" | "MEDIUM" | "HARD" | "EXPERT" | "MIXED"
  >("MIXED");

  const handleContinue = () => {
    const finalQuestionLimit =
      questionLimit === 0
        ? Number(customQuestionLimit)
        : questionLimit;

    if (!finalQuestionLimit || finalQuestionLimit < 1) {
      errorToast("Please enter a valid question count.");

      return;
    }

    if (finalQuestionLimit > 200) {
      errorToast("Question count cannot exceed 200.");

      return;
    }

    onContinue({
      questionLimit: finalQuestionLimit,
      difficultyMode,
    });
  };

  return (
    <ModalContainer open={open} maxWidth="max-w-xl">
      <ModalHeader
        title="Create Exam"
        description="Choose the exam configuration before building questions."
        onClose={onClose}
      />

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Question Limit
          </label>

          <select
            value={
              [10, 20, 30, 40, 50].includes(questionLimit)
                ? questionLimit
                : "CUSTOM"
            }
            onChange={(e) => {
              const value = e.target.value;

              if (value === "CUSTOM") {
                setQuestionLimit(0);

                return;
              }

              setQuestionLimit(Number(value));
            }}
            className="border-border bg-card w-full rounded-xl border px-4 py-2"
          >
            <option value={10}>10 Questions</option>

            <option value={20}>20 Questions</option>

            <option value={30}>30 Questions</option>

            <option value={40}>40 Questions</option>

            <option value={50}>50 Questions</option>

            <option value="CUSTOM">Custom</option>
          </select>

          {questionLimit === 0 && (
            <div className="mt-3">
              <label className="mb-2 block text-sm font-medium">
                Custom Question Count
              </label>

              <input
                type="text"
                inputMode="numeric"
                value={customQuestionLimit}
                onChange={(e) => {
                  const value = e.target.value.replace(
                    /\D/g,
                    ""
                  );

                  setCustomQuestionLimit(value);
                }}
                maxLength={3}
                placeholder="Enter question count (1-200)"
                className="border-border bg-card w-full rounded-xl border px-4 py-2"
              />
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Difficulty Mode
          </label>

          <select
            value={difficultyMode}
            onChange={(e) =>
              setDifficultyMode(
                e.target.value as
                  | "EASY"
                  | "MEDIUM"
                  | "HARD"
                  | "EXPERT"
                  | "MIXED"
              )
            }
            className="border-border bg-card w-full rounded-xl border px-4 py-2"
          >
            <option value="MIXED">
              Mixed Difficulties
            </option>

            <option value="EASY">Easy Only</option>

            <option value="MEDIUM">Medium Only</option>

            <option value="HARD">Hard Only</option>

            <option value="EXPERT">Expert Only</option>
          </select>
        </div>

        <div className="bg-muted/30 rounded-xl p-4 text-sm">
          <p className="font-medium">Exam Configuration</p>

          <p className="text-muted-foreground mt-2">
            The selected settings determine which questions
            will be available during exam construction.
          </p>
        </div>
      </div>

      <ModalActions
        submitLabel="Continue"
        onSubmit={handleContinue}
        onCancel={onClose}
      />
    </ModalContainer>
  );
}

export default memo(CreateExamSetupModal);
