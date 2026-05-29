import type { Exam } from "./exam";

export interface SectionSubject {
  id: number;

  subject: {
    id: number;

    name: string;

    code: string;

    faculty?: {
      id: number;

      name: string;
    } | null;
  };
}

export interface Section {
  id: number;
  name: string;
  sectionCode: string;
  yearLevel: number;
  program: string;
  createdAt: string;
  isArchived: boolean;
  users: any[];
  exams: Exam[];
  sectionSubjects: SectionSubject[];
}
