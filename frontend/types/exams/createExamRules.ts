export interface CreateExamRules {
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

  thresholdAction:
    | "AUTO_SUBMIT"
    | "END_EXAM"
    | "FLAG_REVIEW";
}
