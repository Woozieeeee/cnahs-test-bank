export interface FacultyQuestion {
  id: number;

  question: string;

  correctAnswer: string;

  explanation?: string | null;

  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  isArchived: boolean;

  totalAttempts: number;

  totalCorrect: number;

  createdAt: string;

  updatedAt: string;

  options: {
    id: number;

    optionText: string;

    isCorrect: boolean;
  }[];
}
