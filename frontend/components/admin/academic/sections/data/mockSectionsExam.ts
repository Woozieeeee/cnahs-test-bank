import type { Exam } from "@/types/exam";

export const mockSectionExams: Exam[] = [
  {
    id: 1,

    title: "Pharmacology Midterm",

    description: "Midterm examination for Pharmacology.",

    difficulty: "MEDIUM",

    duration: 60,

    status: "ONGOING",

    startsAt: "2026-05-01T09:00:00Z",

    endsAt: "2026-05-01T10:00:00Z",

    createdAt: "2026-04-25T08:00:00Z",
  },

  {
    id: 2,

    title: "Anatomy Quiz",

    description:
      "Assessment covering anatomy fundamentals.",

    difficulty: "EASY",

    duration: 30,

    status: "COMPLETED",

    startsAt: "2026-04-20T09:00:00Z",

    endsAt: "2026-04-20T09:30:00Z",

    createdAt: "2026-04-15T08:00:00Z",
  },

  {
    id: 3,

    title: "Maternal Nursing Final",

    description: "Final examination for Maternal Nursing.",

    difficulty: "HARD",

    duration: 90,

    status: "SCHEDULED",

    startsAt: "2026-06-10T09:00:00Z",

    endsAt: "2026-06-10T10:30:00Z",

    createdAt: "2026-05-20T08:00:00Z",
  },
];
