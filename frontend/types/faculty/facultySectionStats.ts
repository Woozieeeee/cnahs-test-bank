export interface FacultySectionStats {
  id: number;
  name: string;
  totalExams: number;
  scheduledExams: number;
  ongoingExams: number;
  completedExams: number;
  totalAttempts: number;
  totalQuestions: number;
  averageScore: number;
}
