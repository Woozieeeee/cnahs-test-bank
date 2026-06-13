import api from "@/lib/axios";

export interface SubjectProgress {
  id: number;
  slug: string;
  name: string;
  code: string;
  progress: number;
  status: "IN_PROGRESS" | "COMPLETED" | "LOCKED" | "STAND_BY";
  currentTier: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  easyPassed: boolean;
  mediumPassed: boolean;
  hardPassed: boolean;
  expertPassed: boolean;
  easyUnlocked: boolean;
  mediumUnlocked: boolean;
  hardUnlocked: boolean;
  expertUnlocked: boolean;
}

export interface TierStats {
  tier: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  completed: number;
  inProgress: number;
  locked: number;
  totalAttempts: number;
  averageScore: number;
}

export interface ProgressOverview {
  totalSubjects: number;
  completedSubjects: number;
  activeSubjects: number;
  overallProgress: number;
  averageScore: number;
  subjects: SubjectProgress[];
  tierStats: TierStats[];
}

/**
 * Fetch student progress data
 */
export const getStudentProgress = async (): Promise<ProgressOverview> => {
  const response = await api.get("/student/progress");
  return response.data.data;
};
