export interface FacultyQuestion {
  id: number;

  question: string;

  correctAnswer: string;

  explanation?: string;

  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  isArchived: boolean;

  totalAttempts: number;

  totalCorrect: number;

  options: {
    id: number;

    optionText: string;

    isCorrect: boolean;
  }[];
}
