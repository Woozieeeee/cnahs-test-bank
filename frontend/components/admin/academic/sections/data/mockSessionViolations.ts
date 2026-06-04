import type { Violation } from "@/types/violation";

export const mockSessionViolations: Violation[] = [
  {
    id: 1,
    type: "Tab Switching",
    severity: "MEDIUM", // Must be one of "LOW" | "MEDIUM" | "HIGH"
    time: "09:12 AM",
    timeAgo: "2 hours ago",
    createdAt: "2026-06-04T09:12:00Z",
    student: "John Doe",
    studentId: "STU-123",
    description:
      "User switched browser tabs during the examination.",
  },

  {
    id: 2,

    type: "Window Blur",

    severity: "LOW",

    time: "09:20 AM",
    timeAgo: "2 hours ago",
    createdAt: "2026-06-04T09:12:00Z",
    student: "John Doe",
    studentId: "STU-123",
    description:
      "User switched browser tabs during the examination.",
  },

  {
    id: 3,
    type: "Multiple Faces Detected",
    severity: "HIGH",
    time: "09:45 AM",
    timeAgo: "2 hours ago",
    createdAt: "2026-06-04T09:12:00Z",
    student: "John Doe",
    studentId: "STU-123",
    description:
      "User switched browser tabs during the examination.",
  },
];
