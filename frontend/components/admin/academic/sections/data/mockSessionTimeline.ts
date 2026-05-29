export const mockSessionTimeline = [
  {
    id: 1,

    title: "Exam Started",

    severity: "INFO",

    description:
      "Student successfully entered the examination.",

    categories: ["SESSION"],

    createdAt: "2026-05-29T09:30:00",
  },

  {
    id: 2,

    title: "Tab Switching Detected",

    severity: "WARNING",

    description:
      "Student switched away from examination window.",

    categories: ["WARNING"],

    createdAt: "2026-05-29T09:12:00",
  },

  {
    id: 3,

    title: "Window Blur Detected",

    severity: "WARNING",

    description: "Exam window lost focus.",

    categories: ["WARNING"],

    createdAt: "2026-05-29T09:20:00",
  },

  {
    id: 4,

    title: "Returned To Examination",

    severity: "INFO",

    description: "Student returned to examination window.",

    categories: ["SESSION"],

    createdAt: "2026-05-29T09:22:00",
  },

  {
    id: 5,

    title: "Multiple Faces Detected",

    severity: "ERROR",

    description:
      "Additional face detected by monitoring system.",

    categories: ["VIOLATION"],

    createdAt: "2026-05-29T09:45:00",
  },
];
