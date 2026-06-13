import { useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import type { ExamViolation } from "@/types/exams/examSession";

export interface UseExamHandlersProps {
  answers: Record<number, string>;
  violations: ExamViolation[];
  examId?: string;
}

export function useExamHandlers({ answers, violations, examId }: UseExamHandlersProps) {
  const router = useRouter();

  const handleSubmitExam = useCallback(async () => {
    try {
      console.log("Submitting exam with answers:", answers);
      console.log("Violations recorded:", violations);
      
      if (!examId) {
        console.error("Exam ID is required to submit exam");
        return;
      }

      // Get total answered questions
      const answeredCount = Object.keys(answers).length;

      // Submit exam to backend
      const response = await api.post(`/student/exams/${examId}/submit`, {
        answers,
        violations,
        answeredCount,
      });

      console.log("Exam submitted successfully:", response.data);
      
      // Redirect to progress page to see updated progress
      router.push("/student/progress");
    } catch (error) {
      console.error("Error submitting exam:", error);
      // Still redirect on error to prevent user from being stuck
      router.push("/student/progress");
    }
  }, [answers, violations, examId, router]);

  const handleThresholdReached = useCallback(
    (action: string) => {
      if (action === "AUTO_SUBMIT") {
        handleSubmitExam();
      } else if (action === "END_EXAM") {
        setTimeout(() => router.push("/student/progress"), 2000);
      }
    },
    [handleSubmitExam, router]
  );

  return {
    handleSubmitExam,
    handleThresholdReached,
  };
}
