"use client";

import { useEffect, useState } from "react";

import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";
import QuestionForm from "../forms/questionForm";
import { successToast, errorToast } from "@/lib/swal";
import ModalContainer from "@/components/common/modal/modalContainer";
import { memo } from "react";

import { FacultyQuestion } from "@/types/facultyQuestion";

import { updateFacultyQuestion } from "@/services/faculty_service";

interface Props {
  open: boolean;

  question: FacultyQuestion | null;

  onClose: () => void;

  onSuccess: (question: FacultyQuestion) => void;
}

function UpdateQuestionModal({
  open,
  question,
  onClose,
  onSuccess,
}: Props) {
  const [questionText, setQuestionText] = useState("");

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

  useEffect(() => {
    if (!question) return;

    setQuestionText(question.question);

    setExplanation(question.explanation || "");

    setDifficulty(question.difficulty);

    setCorrectAnswer(question.correctAnswer);

    setOptionA(question.options?.[0]?.optionText || "");

    setOptionB(question.options?.[1]?.optionText || "");

    setOptionC(question.options?.[2]?.optionText || "");

    setOptionD(question.options?.[3]?.optionText || "");
  }, [question]);

  const handleSubmit = async () => {
    if (!question) return;

    if (
      !questionText.trim() ||
      !optionA.trim() ||
      !optionB.trim() ||
      !optionC.trim() ||
      !optionD.trim() ||
      !correctAnswer
    ) {
      errorToast("Please complete all required fields.");

      return;
    }

    try {
      setLoading(true);

      const updatedQuestion = await updateFacultyQuestion(
        question.id,
        {
          question: questionText,

          explanation,

          difficulty,

          correctAnswer,

          options: [optionA, optionB, optionC, optionD],
        }
      );

      successToast("Question updated successfully.");

      onSuccess(updatedQuestion);

      onClose();
    } catch (error: any) {
      errorToast(
        error.response?.data?.message ||
          "Failed to update question."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open || !question) return null;

  return (
    <ModalContainer open={open} maxWidth="max-w-5xl">
      <ModalHeader
        title="Edit Question"
        description="Update question details."
        onClose={onClose}
      />

      <QuestionForm
        question={questionText}
        setQuestion={setQuestionText}
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
        submitLabel={loading ? "Saving..." : "Save Changes"}
        submitDisabled={
          loading || !questionText.trim() || !correctAnswer
        }
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </ModalContainer>
  );
}
export default memo(UpdateQuestionModal);
