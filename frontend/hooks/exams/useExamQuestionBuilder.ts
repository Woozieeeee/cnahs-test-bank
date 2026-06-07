"use client";

import { useMemo } from "react";

import type { ExamBuilderQuestion } from "@/types/exams/createExam";

interface Props {
  questions: ExamBuilderQuestion[];

  search: string;

  topic: string;

  examLevel: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
}

export default function useExamQuestionBuilder({
  questions,
  search,
  topic,
  examLevel,
}: Props) {
  const topics = useMemo(
    () => [
      ...new Set(
        questions.map((question) => question.topicName)
      ),
    ],
    [questions]
  );

  const suggestions = useMemo(
    () => questions.map((question) => question.question),
    [questions]
  );

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch = question.question
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTopic =
        topic === "ALL"
          ? true
          : question.topicName === topic;

      const matchesDifficulty =
        question.difficulty === examLevel;

      return (
        matchesSearch && matchesTopic && matchesDifficulty
      );
    });
  }, [questions, search, topic, examLevel]);

  return {
    topics,
    suggestions,
    filteredQuestions,
  };
}
