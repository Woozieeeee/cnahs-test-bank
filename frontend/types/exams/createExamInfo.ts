export interface CreateExamInfo {
  title: string;

  description: string;

  duration: number;

  passingScore: number;

  examCode: string;

  sectionIds: number[];

  startsAt: string;

  endsAt: string;

  minutesPerQuestion: number;
}
