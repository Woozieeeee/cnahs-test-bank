import api from "@/lib/axios";

export interface DashboardStats {
  totalSubjects: number;
  activeSubjects: number;
  completedSubjects: number;
  overallProgress: number;
}

export interface SubjectCardData {
  id: number;
  slug: string;
  name: string;
  code: string;
  progress: number;
  currentTier: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  nextUnlock: "EASY" | "MEDIUM" | "HARD" | "EXPERT" | null;
  examsAvailable: number;
  status: "IN_PROGRESS" | "COMPLETED" | "LOCKED" | "STAND_BY";
  easyPassed: boolean;
  mediumPassed: boolean;
  hardPassed: boolean;
  expertPassed: boolean;
}

export interface StudentDashboardData {
  stats: DashboardStats;
  subjects: SubjectCardData[];
}

/**
 * Fetch student dashboard data
 */
export const getStudentDashboard = async (): Promise<StudentDashboardData> => {
  const response = await api.get("/student/dashboard");
  return response.data.data;
};
