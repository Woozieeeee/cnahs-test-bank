"use client";

import { useEffect } from "react";

import useExamDraft from "./useExamDraft";

import type { CreateExamRules } from "@/types/exams/createExamRules";
import type { CreateExamInfo } from "@/types/exams/createExamInfo";
import type { ExamBuilderQuestion } from "@/types/exams/createExam";

interface Props {
  subjectId: number;

  currentStep: number;

  title: string;

  questionLimit: number;

  examLevel: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  onSaved?: () => void;

  rules: CreateExamRules;

  info: CreateExamInfo;

  selectedQuestions: ExamBuilderQuestion[];

  disabled?: boolean;
}

export default function useExamAutoSave({
  subjectId,
  currentStep,
  title,
  questionLimit,
  examLevel,
  onSaved,
  rules,
  info,
  selectedQuestions,
  disabled = false,
}: Props) {
  const { saveDraft } = useExamDraft(subjectId);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        await saveDraft(currentStep, title, {
          questionLimit,
          examLevel,

          rules,
          info,

          selectedQuestions: selectedQuestions.map(
            (question) => question.id
          ),
        });

        onSaved?.();
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    disabled,
    currentStep,
    title,
    rules,
    info,
    questionLimit,
    examLevel,
    selectedQuestions,
    saveDraft,
    onSaved,
  ]);
}
