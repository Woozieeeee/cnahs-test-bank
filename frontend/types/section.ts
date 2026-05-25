export interface SectionSubject {
  id: number;

  subject: {
    id: number;
    name: string;
    code: string;
  };
}

export interface Section {
  id: number;
  name: string;
  yearLevel: number;
  program: string;
  createdAt: string;
  users: any[];
  exams: any[];
  sectionSubjects: SectionSubject[];
}
