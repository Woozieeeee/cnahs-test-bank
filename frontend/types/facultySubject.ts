export interface FacultySubject {
  id: number;

  code: string;

  name: string;

  description: string | null;

  totalSections: number;

  totalStudents: number;

  totalQuestions: number;

  totalAssessments: number;
}
