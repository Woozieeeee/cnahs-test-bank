export interface CreateExamPayload {
  title: string;

  description?: string;

  examCode: string;

  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  sectionIds: number[];

  duration: number;

  passingScore: number;

  startsAt: string;

  endsAt: string;

  randomizeQuestions: boolean;

  randomizeAnswers: boolean;

  showResultAfterSubmission: boolean;

  showCorrectAnswers: boolean;

  showExplanations: boolean;

  requireFullscreen: boolean;

  detectTabSwitch: boolean;

  detectWindowBlur: boolean;

  blockCopy: boolean;

  blockPaste: boolean;

  blockRightClick: boolean;

  detectDeviceChange: boolean;

  violationThreshold: number;

  thresholdAction: "AUTO_SUBMIT" | "END_EXAM" | "FLAG_REVIEW";

  questionIds: number[];
}
