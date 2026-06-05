export interface Assessment {
  id: number;

  title: string;

  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  status:
    | "DRAFT"
    | "SCHEDULED"
    | "ONGOING"
    | "COMPLETED"
    | "ARCHIVED";

  duration: number;

  passingScore: number;

  startsAt?: string | null;

  endsAt?: string | null;

  section: {
    id: number;

    name: string;
  };

  _count: {
    examQuestions: number;

    attempts: number;
  };
}

export interface AssessmentSection {
  id: number;

  name: string;
}

export interface SubjectAssessmentsResponse {
  assessments: Assessment[];

  sections: AssessmentSection[];
}
