export interface CreateExamSetup {
  questionLimit: number;

  examLevel: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
}
