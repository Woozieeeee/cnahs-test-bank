export interface DraftAssessment {
  id: number;

  title: string | null;

  currentStep: number;

  updatedAt: string;

  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  questionCount: number;
}
