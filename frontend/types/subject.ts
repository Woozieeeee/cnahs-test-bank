export interface SectionSubject {
  id: number;

  section: {
    id: number;

    name: string;
  };

  subject: Subject;

  faculty?: {
    id: number;

    name: string;
  } | null;
}

export interface Subject {
  id: number;

  name: string;

  code: string;

  faculty?: {
    id: number;

    name: string;
  } | null;

  description?: string;

  createdAt?: string;

  updatedAt?: string;

  isArchived?: boolean;

  totalStudents?: number;

  totalQuestions?: number;

  totalExams?: number;

  faculties?: {
    id: number;

    facultyId: number;

    faculty: {
      id: number;

      name: string;
    };
  }[];

  sectionSubjects?: SectionSubject[];
}
export interface SubjectPerformance {
  exam: string;

  score: number;
}

export interface SubjectStatistics {
  students: number;

  exams: number;

  examStatus: "ONGOING" | "SCHEDULED" | "NO ACTIVE EXAM";
}
