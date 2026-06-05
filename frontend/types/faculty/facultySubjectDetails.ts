export interface FacultySubjectDetails {
  id: number;

  code: string;

  name: string;

  description: string | null;

  totalTopics: number;

  totalQuestions: number;

  totalAssessments: number;

  totalSections: number;

  totalStudents: number;
}
