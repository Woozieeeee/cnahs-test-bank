"use client";

import { useEffect, useState } from "react";
import { getExamBuilderQuestions } from "@/services/faculty_service";
import type { ExamBuilderQuestion } from "@/types/exams/createExam";

export default function useExamBuilderQuestions(
  subjectId: number,
  difficulty: string
) {
  const [questions, setQuestions] = useState<
    ExamBuilderQuestion[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. A flag to track if the effect is still "active"
    let isMounted = true;

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors

        const data = await getExamBuilderQuestions(
          subjectId,
          difficulty
        );

        // 2. Only update state if the component is still mounted
        if (isMounted) {
          const mappedQuestions: ExamBuilderQuestion[] =
            data.map((question: any) => ({
              id: question.id,
              question: question.question,
              difficulty: question.difficulty,
              topicId: question.topic?.id ?? 0,
              topicName:
                question.topic?.name ?? "Unknown Topic",
            }));

          setQuestions(mappedQuestions);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ??
              "Failed to load questions."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (subjectId) {
      fetchQuestions();
    } else {
      setLoading(false);
    }

    // 3. Cleanup function to prevent setting state on unmounted component
    return () => {
      isMounted = false;
    };
  }, [subjectId, difficulty]);

  return { questions, loading, error };
}
