export interface TopicPerformance {
  name: string;

  successRate: number;
}

export interface SubjectDashboard {
  averageRating: number;

  passingRate: number;

  expertReadyStudents: number;

  atRiskStudents: number;

  progression: {
    easy: number;

    medium: number;

    hard: number;

    expert: number;
  };

  assessments: {
    total: number;

    ongoing: number;

    completed: number;
  };

  questions: {
    total: number;

    easy: number;

    medium: number;

    hard: number;

    expert: number;
  };

  weakestTopics: TopicPerformance[];

  strongestTopics: TopicPerformance[];
}
