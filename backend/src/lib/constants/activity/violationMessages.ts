export const VIOLATION_MESSAGES = {
  TAB_SWITCH: {
    action: "Tab switch detected",
    description:
      "Student navigated away from the exam window.",
  },

  WINDOW_BLUR: {
    action: "Window focus lost",
    description:
      "Exam session temporarily lost active focus.",
  },

  FULLSCREEN_EXIT: {
    action: "Fullscreen mode exited",
    description: "Exam focus protection was interrupted.",
  },

  COPY_ATTEMPT: {
    action: "Copy action blocked",
    description:
      "Attempted to copy protected exam content.",
  },

  PASTE_ATTEMPT: {
    action: "Paste action blocked",
    description:
      "Unauthorized content insertion was prevented.",
  },

  MULTIPLE_FACE_DETECTED: {
    action: "Multiple faces detected",
    description:
      "Additional individuals appeared in webcam monitoring.",
  },

  NO_FACE_DETECTED: {
    action: "Face visibility lost",
    description:
      "Webcam could not detect the student temporarily.",
  },

  DEVICE_CHANGE: {
    action: "Device environment changed",
    description:
      "System detected a possible device or display change.",
  },

  SUSPICIOUS_ACTIVITY: {
    action: "Suspicious activity flagged",
    description:
      "Behavior matched one or more monitoring risk indicators.",
  },
} as const;
