import { CreateExamRules } from "@/types/exams/createExamRules";

export const DEFAULT_EXAM_RULES: CreateExamRules = {
  randomizeQuestions: true,
  randomizeAnswers: true,
  showResultAfterSubmission: true,
  showCorrectAnswers: false,
  showExplanations: false,
  requireFullscreen: true,
  detectTabSwitch: true,
  detectWindowBlur: true,
  blockCopy: true,
  blockPaste: true,
  blockRightClick: true,
  detectDeviceChange: true,
  violationThreshold: 10,
  thresholdAction: "AUTO_SUBMIT",
};
