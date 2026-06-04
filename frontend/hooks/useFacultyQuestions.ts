"use client";

import { useCallback, useEffect, useState } from "react";

import { getFacultyQuestions } from "@/services/faculty_service";

import { FacultyQuestion } from "@/types/facultyQuestion";

export default function useFacultyQuestions(
  topicId: number
) {
  const [questions, setQuestions] = useState<
    FacultyQuestion[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const addQuestion = (question: FacultyQuestion) => {
    setQuestions((prev) => [question, ...prev]);
  };

  const updateQuestion = (
    updatedQuestion: FacultyQuestion
  ) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === updatedQuestion.id
          ? updatedQuestion
          : question
      )
    );
  };

  const archiveQuestion = (questionId: number) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              isArchived: true,
            }
          : question
      )
    );
  };

  const restoreQuestion = (questionId: number) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              isArchived: false,
            }
          : question
      )
    );
  };

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      if (!topicId || Number.isNaN(topicId)) {
        setQuestions([]);

        return;
      }

      const data = await getFacultyQuestions(topicId);

      setQuestions(data);
    } catch (error: unknown) {
      const responseError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      setError(
        responseError.response?.data?.message ||
          "Failed to load questions."
      );
    } finally {
      setLoading(false);
    }
  }, [topicId]);

  useEffect(() => {
    void (async () => {
      await fetchQuestions();
    })();
  }, [fetchQuestions]);

  return {
    questions,

    loading,

    error,

    refresh: fetchQuestions,

    addQuestion,

    updateQuestion,

    archiveQuestion,

    restoreQuestion,
  };
}
