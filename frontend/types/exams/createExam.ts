export interface ExamBuilderQuestion {
  id: number;

  question: string;

  topicId: number;

  topicName: string;

  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
}
