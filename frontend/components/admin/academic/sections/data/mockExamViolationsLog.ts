import type { ExamViolation } from "@/types/examViolation";

export const mockExamViolationLogs: ExamViolation[] = [
  {
    id: 1,

    student: "Juan Cruz",

    studentId: "2024-001",

    type: "Multiple Face Detection",

    severity: "HIGH",

    description:
      "Multiple faces detected during assessment.",

    timeAgo: "2 mins ago",

    createdAt: "2026-05-30T09:14:00Z",
  },

  {
    id: 2,

    student: "Maria Santos",

    studentId: "2024-002",

    type: "Looking Away",

    severity: "MEDIUM",

    description:
      "Student repeatedly looked away from screen.",

    timeAgo: "5 mins ago",

    createdAt: "2026-05-30T09:10:00Z",
  },

  {
    id: 3,

    student: "Maria Santos",

    studentId: "2024-002",

    type: "Looking Away",

    severity: "MEDIUM",

    description:
      "Student repeatedly looked away from screen.",

    timeAgo: "5 mins ago",

    createdAt: "2026-05-30T09:10:00Z",
  },

  {
    id: 4,

    student: "Maria Santos",

    studentId: "2024-002",

    type: "Looking Away",

    severity: "MEDIUM",

    description:
      "Student repeatedly looked away from screen.",

    timeAgo: "5 mins ago",

    createdAt: "2026-05-30T09:10:00Z",
  },

  {
    id: 5,

    student: "Maria Santos",

    studentId: "2024-002",

    type: "Looking Away",

    severity: "MEDIUM",

    description:
      "Student repeatedly looked away from screen.",

    timeAgo: "5 mins ago",

    createdAt: "2026-05-30T09:10:00Z",
  },
];
