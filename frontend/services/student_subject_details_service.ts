import api from "@/lib/axios";

export interface ExamData {
  id: number;
  title: string;
  description: string | null;
  duration: number;
  totalQuestions: number;
  status: string;
  startsAt: string | null;
  endsAt: string | null;
  passingScore: number;
  hasAttempted?: boolean;
  attemptStatus?: string;
  lastAttemptScore?: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  unansweredQuestions?: number;
}

export interface DifficultyTierData {
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  passed: boolean;
  highestScore: number | null;
  passingScore: number;
  exams: ExamData[];
  examCount: number;
  isUnlocked: boolean;
}

export interface SubjectDetailsData {
  id: number;
  name: string;
  code: string;
  description: string | null;
  totalExams: number;
  tiers: Record<"EASY" | "MEDIUM" | "HARD" | "EXPERT", DifficultyTierData>;
}


export const getSubjectDetails = async (
  subjectIdOrSlug: number | string
): Promise<SubjectDetailsData> => {
  const response = await api.get(`/student/subjects/${subjectIdOrSlug}`);
  return response.data.data;
};
