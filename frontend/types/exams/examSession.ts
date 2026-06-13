export interface ExamViolation {
  id: number;
  type: "TAB_SWITCH" | "WINDOW_BLUR" | "FULLSCREEN_EXIT" | "COPY_ATTEMPT" | "PASTE_ATTEMPT" | "RIGHT_CLICK" | "DEVICE_CHANGE";
  timestamp: Date;
  severity: "WARNING" | "CRITICAL";
  description: string;
}

export interface SecurityMetrics {
  tabSwitches: number;
  windowBlurs: number;
  fullscreenExits: number;
  copyAttempts: number;
  pasteAttempts: number;
  rightClicks: number;
  deviceChanges: number;
  totalViolations: number;
}

export interface ExamSession {
  id: number;
  examId: number;
  studentId: number;
  startTime: Date;
  endTime?: Date;
  duration: number;
  score?: number;
  status: "IN_PROGRESS" | "SUBMITTED" | "COMPLETED" | "FLAGGED" | "ENDED_EARLY";
  violations: ExamViolation[];
  securityMetrics: SecurityMetrics;
  deviceInfo: {
    userAgent: string;
    screenResolution: string;
    timezone: string;
  };
}

export interface ExamQuestion {
  id: number;
  text: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
  options?: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  timeLimit?: number;
}

export interface ExamConfig {
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
}
