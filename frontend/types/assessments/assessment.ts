export interface Assessment {
  id: number;

  title: string;

  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  status:
    | "DRAFT"
    | "SCHEDULED"
    | "ONGOING"
    | "COMPLETED"
    | "ARCHIVED"
    | "CANCELLED";

  duration: number;

  passingScore: number;

  startsAt?: string | null;

  endsAt?: string | null;

  subjectId: number;

  section: {
    id: number;
    name: string;
  };

  _count: {
    examQuestions: number;
    attempts: number;
  };
}

export interface SubjectAssessmentsResponse {
  assessments: Assessment[];

  sections: {
    id: number;
    name: string;
  }[];
}
