import { useState, useEffect } from "react";
import api from "@/lib/axios";

interface ExamQuestion {
  id: number;
  text: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
  options?: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
}

interface ExamConfig {
  randomizeQuestions: boolean;
  randomizeAnswers: boolean;
  showResultAfterSubmission: boolean;
  showCorrectAnswers: boolean;
  showExplanations: boolean;
  requireFullscreen: boolean;
  detectTabSwitch: boolean;
  detectWindowBlur: boolean;
  blockCopy: boolean;
  blockPaste: boolean;
  blockRightClick: boolean;
  detectDeviceChange: boolean;
  violationThreshold: number;
  thresholdAction: "AUTO_SUBMIT" | "END_EXAM" | "FLAG_REVIEW";
}

export interface ExamData {
  id: number;
  title: string;
  description: string;
  totalQuestions: number;
  duration: number;
  minutesPerQuestion: number;
  passingScore: number;
  questions: ExamQuestion[];
  config: ExamConfig;
  startsAt: Date;
  endsAt: Date;
}

interface UseExamDataProps {
  examId: string;
  enabled: boolean;
}

export function useExamData({ examId, enabled }: UseExamDataProps) {
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const loadExam = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Call backend endpoint to get exam data with faculty-configured settings
        const response = await api.get(`/student/exams/${examId}`);

        if (response.data.success) {
          setExamData(response.data.data);
        } else {
          setError(response.data.message || "Failed to load exam");
        }
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || "Failed to load exam. Please try again.";
        setError(errorMessage);
        console.error("Error fetching exam:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadExam();
  }, [enabled, examId]);

  return { examData, isLoading, error };
}
