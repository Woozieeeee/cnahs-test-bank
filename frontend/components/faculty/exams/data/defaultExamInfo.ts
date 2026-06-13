import type { CreateExamInfo } from "@/types/exams/createExamInfo";

import { generateExamCode } from "@/lib/exams/generateExamCode";

export const DEFAULT_EXAM_INFO: CreateExamInfo = {
  title: "",

  description: "",

  duration: 60,

  sectionIds: [],

  passingScore: 60,

  examCode: generateExamCode(),

  startsAt: "",

  endsAt: "",

  minutesPerQuestion: 0,
};
