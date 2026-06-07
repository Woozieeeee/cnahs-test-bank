import type { CreateExamInfo } from "./createExamInfo";
import type { CreateExamRules } from "./createExamRules";

export interface ExamDraftData {
  questionLimit: number;

  examLevel: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  selectedQuestions: number[];

  rules: CreateExamRules;

  info: CreateExamInfo;
}

export interface ExamDraft {
  id: number;

  facultyId: number;

  subjectId: number;

  title: string | null;

  currentStep: number;

  draftData: ExamDraftData;

  createdAt: string;

  updatedAt: string;
}
