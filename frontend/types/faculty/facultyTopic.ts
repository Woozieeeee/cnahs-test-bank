export interface FacultyTopic {
  id: number;

  name: string;

  description: string | null;

  totalQuestions: number;

  isArchived: boolean;
}
