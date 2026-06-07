"use client";

import { useState, useCallback } from "react";

import type { CreateExamRules } from "@/types/exams/createExamRules";
import type { ExamBuilderQuestion } from "@/types/exams/createExam";
import type { ExamDraft } from "@/types/exams/examDraft";
import type { CreateExamInfo } from "@/types/exams/createExamInfo";

import { DEFAULT_EXAM_RULES } from "@/components/faculty/exams/data/defaultExamRules";
import { DEFAULT_EXAM_INFO } from "@/components/faculty/exams/data/defaultExamInfo";
import { generateExamCode } from "@/lib/exams/generateExamCode";

export default function useCreateExamWizard(
  questionLimit: number
) {
  const [currentStep, setCurrentStep] = useState(1);

  const [search, setSearch] = useState("");

  const [topic, setTopic] = useState("ALL");

  const [rules, setRules] = useState<CreateExamRules>(
    DEFAULT_EXAM_RULES
  );

  const [info, setInfo] = useState<CreateExamInfo>(
    DEFAULT_EXAM_INFO
  );

  const [selectedQuestions, setSelectedQuestions] =
    useState<ExamBuilderQuestion[]>([]);

  const canProceedToStep2 =
    selectedQuestions.length === questionLimit;

  const canProceedToStep3 = true;

  const canProceedToStep4 =
    info.title.trim().length >= 3 &&
    info.duration > 0 &&
    info.passingScore > 0 &&
    info.sectionIds.length > 0 &&
    info.startsAt.length > 0 &&
    info.endsAt.length > 0 &&
    new Date(info.endsAt) > new Date(info.startsAt);

  const handleAddQuestion = (
    question: ExamBuilderQuestion
  ) => {
    setSelectedQuestions((previous) => {
      if (previous.length >= questionLimit) {
        return previous;
      }

      return [...previous, question];
    });
  };

  const handleRemoveQuestion = (questionId: number) => {
    setSelectedQuestions((previous) =>
      previous.filter(
        (question) => question.id !== questionId
      )
    );
  };

  const handleMoveUp = (questionId: number) => {
    setSelectedQuestions((previous) => {
      const index = previous.findIndex(
        (question) => question.id === questionId
      );

      if (index <= 0) {
        return previous;
      }

      const updated = [...previous];

      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];

      return updated;
    });
  };

  const handleMoveDown = (questionId: number) => {
    setSelectedQuestions((previous) => {
      const index = previous.findIndex(
        (question) => question.id === questionId
      );

      if (index === -1 || index === previous.length - 1) {
        return previous;
      }

      const updated = [...previous];

      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];

      return updated;
    });
  };

  const restoreDraft = useCallback(
    (
      draft: ExamDraft,
      questions: ExamBuilderQuestion[]
    ) => {
      const restoredQuestions = questions.filter(
        (question) =>
          draft.draftData.selectedQuestions.includes(
            question.id
          )
      );

      setCurrentStep(draft.currentStep);

      setSelectedQuestions(restoredQuestions);

      setRules({
        ...DEFAULT_EXAM_RULES,
        ...(draft.draftData.rules ?? {}),
      });

      setInfo({
        ...DEFAULT_EXAM_INFO,
        ...(draft.draftData.info ?? {}),
      });
    },
    []
  );

  const resetWizard = useCallback(() => {
    setCurrentStep(1);

    setSearch("");

    setTopic("ALL");

    setRules(DEFAULT_EXAM_RULES);

    setInfo({
      ...DEFAULT_EXAM_INFO,

      examCode: generateExamCode(),
    });

    setSelectedQuestions([]);
  }, []);

  return {
    currentStep,
    setCurrentStep,

    search,
    setSearch,

    topic,
    setTopic,

    rules,
    setRules,

    info,
    setInfo,

    restoreDraft,

    resetWizard,

    selectedQuestions,

    canProceedToStep2,
    canProceedToStep3,
    canProceedToStep4,

    handleAddQuestion,
    handleRemoveQuestion,
    handleMoveUp,
    handleMoveDown,
  };
}
