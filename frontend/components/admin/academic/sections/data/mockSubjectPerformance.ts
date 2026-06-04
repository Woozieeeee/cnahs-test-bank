import type {
  SubjectPerformance,
  SubjectStatistics,
} from "@/types/subject";

export const mockSubjectStatistics: SubjectStatistics = {
  students: 45,

  exams: 6,

  examStatus: "ONGOING",
};

export const mockSubjectPerformance: SubjectPerformance[] =
  [
    {
      exam: "Quiz 1",
      score: 78,
    },
    {
      exam: "Quiz 2",
      score: 82,
    },
    {
      exam: "Midterm",
      score: 85,
    },
    {
      exam: "Quiz 3",
      score: 88,
    },
  ];
