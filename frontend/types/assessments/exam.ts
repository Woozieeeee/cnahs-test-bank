export type ExamStatus =
  | "SCHEDULED"
  | "ONGOING"
  | "COMPLETED"
  | "ARCHIVED";

export type ExamDifficulty =
  | "EASY"
  | "MEDIUM"
  | "HARD"
  | "EXPERT";

export interface Exam {
  id: number;

  title: string;

  description?: string | null;

  difficulty: ExamDifficulty;

  duration: number;

  status: ExamStatus;

  startsAt?: string | null;

  endsAt?: string | null;

  createdAt: string;
}
