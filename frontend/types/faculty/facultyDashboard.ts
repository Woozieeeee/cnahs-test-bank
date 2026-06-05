export interface FacultyDashboard {
  assignedSubjects: number;

  totalSections: number;

  totalStudents: number;

  totalQuestions: number;

  totalAssessments: number;

  subjects: {
    id: number;

    code: string;

    name: string;

    sections: number;

    students: number;

    questions: number;

    assessments: number;
  }[];

  upcomingExams: {
    id: number;

    title: string;

    subject: string;

    difficulty: string;

    scheduledAt: string;
  }[];
}
