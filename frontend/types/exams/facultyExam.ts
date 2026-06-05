export interface FacultyExam {
  id: number;

  title: string;

  status:
    | "DRAFT"
    | "SCHEDULED"
    | "ONGOING"
    | "COMPLETED"
    | "ARCHIVED";

  subjectId: number;

  subjectName: string;

  subjectCode: string;

  sectionId: number;

  sectionName: string;

  totalQuestions: number;

  totalAttempts: number;

  averageScore: number;

  startsAt: string | null;

  endsAt: string | null;

  createdAt: string;
}
