"use client";

import { useState } from "react";

import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";
import QuestionForm from "../forms/questionForm";
import { successToast, errorToast } from "@/lib/swal";
import ModalContainer from "@/components/common/modal/modalContainer";
import { memo } from "react";
import { createFacultyQuestion } from "@/services/faculty_service";

import type { FacultyQuestion } from "@/types/facultyQuestion";

interface Props {
  open: boolean;

  onClose: () => void;

  topicId: number;

  onSuccess: (question: FacultyQuestion) => void;
}

function CreateQuestionModal({
  open,
  onClose,
  topicId,
  onSuccess,
}: Props) {
  const [question, setQuestion] = useState("");

  const [optionA, setOptionA] = useState("");

  const [optionB, setOptionB] = useState("");

  const [optionC, setOptionC] = useState("");

  const [optionD, setOptionD] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState("");

  const [difficulty, setDifficulty] = useState<
    "EASY" | "MEDIUM" | "HARD" | "EXPERT"
  >("EASY");

  const [explanation, setExplanation] = useState("");

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setQuestion("");

    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");

    setCorrectAnswer("");

    setDifficulty("EASY");

    setExplanation("");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const createdQuestion = await createFacultyQuestion(
        topicId,
        {
          question,

          explanation,

          difficulty,

          correctAnswer,

          options: [optionA, optionB, optionC, optionD],
        }
      );

      successToast("Question created successfully.");

      resetForm();

      onSuccess(createdQuestion);

      onClose();
    } catch (error: unknown) {
      const responseError = error as {
        response?: { data?: { message?: string } };
      };

      errorToast(
        responseError.response?.data?.message ||
          "Failed to create question."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <ModalContainer open={open} maxWidth="max-w-5xl">
      <div className="p-6">
        <ModalHeader
          title="Create Question"
          description="Add a new question to the question bank."
          onClose={onClose}
        />

        <QuestionForm
          question={question}
          setQuestion={setQuestion}
          optionA={optionA}
          setOptionA={setOptionA}
          optionB={optionB}
          setOptionB={setOptionB}
          optionC={optionC}
          setOptionC={setOptionC}
          optionD={optionD}
          setOptionD={setOptionD}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          explanation={explanation}
          setExplanation={setExplanation}
        />

        <ModalActions
          submitLabel={
            loading ? "Creating..." : "Create Question"
          }
          submitDisabled={
            loading || !question.trim() || !correctAnswer
          }
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </ModalContainer>
  );
}
export default memo(CreateQuestionModal);
