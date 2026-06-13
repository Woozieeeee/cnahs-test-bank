import { useState, useCallback, useEffect } from "react";
import type { ExamViolation } from "@/types/exams/examSession";

export interface UseExamSessionProps {
  totalQuestions: number;
  minutesPerQuestion?: number;
  onQuestionTimeUp?: (questionIndex: number) => void;
}

export function useExamSession({ totalQuestions, minutesPerQuestion = 0, onQuestionTimeUp }: UseExamSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [lastViolation, setLastViolation] = useState<ExamViolation | null>(null);
  const [questionTimer, setQuestionTimer] = useState<number>(minutesPerQuestion * 60);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Handle question timer
  useEffect(() => {
    if (minutesPerQuestion === 0) return; // No timer if not set

    const interval = setInterval(() => {
      setQuestionTimer((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          // Time's up - mark answer as 0 and move to next
          if (onQuestionTimeUp) {
            onQuestionTimeUp(currentQuestionIndex);
          }
          // Auto-advance to next question
          handleNextQuestion();
          return minutesPerQuestion * 60; // Reset for next question
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [minutesPerQuestion, currentQuestionIndex, onQuestionTimeUp]);

  const handleAnswerChange = useCallback((questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }, []);

  const handlePreviousQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : prev;
      if (newIndex !== prev && minutesPerQuestion > 0) {
        setQuestionTimer(minutesPerQuestion * 60);
        setQuestionStartTime(Date.now());
      }
      return newIndex;
    });
  }, [minutesPerQuestion]);

  const handleNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => {
      const newIndex = prev < totalQuestions - 1 ? prev + 1 : prev;
      if (newIndex !== prev && minutesPerQuestion > 0) {
        setQuestionTimer(minutesPerQuestion * 60);
        setQuestionStartTime(Date.now());
      }
      return newIndex;
    });
  }, [totalQuestions, minutesPerQuestion]);

  const answeredCount = Object.keys(answers).length;
  const questionTimeDisplay = `${Math.floor(questionTimer / 60)}:${String(questionTimer % 60).padStart(2, "0")}`;

  return {
    currentQuestionIndex,
    answers,
    lastViolation,
    setLastViolation,
    handleAnswerChange,
    handlePreviousQuestion,
    handleNextQuestion,
    answeredCount,
    questionTimer,
    questionTimeDisplay,
    hasQuestionTimer: minutesPerQuestion > 0,
  };
}
