export const mockAssessmentDetails = {
  id: 1,

  title: "Pharmacology Easy Assessment",

  difficulty: "EASY",

  status: "COMPLETED",

  duration: 60,

  passingScore: 60,

  randomizeQuestions: true,

  randomizeOptions: true,

  students: 182,

  averageScore: 74,

  passingRate: 68,

  highestScore: 98,

  lowestScore: 32,

  scoreDistribution: {
    excellent: 24,
    good: 68,
    average: 52,
    poor: 38,
  },

  weakestQuestions: [
    {
      id: 124,
      topic: "Pharmacology",
      successRate: 42,
    },

    {
      id: 211,
      topic: "Drug Computation",
      successRate: 38,
    },

    {
      id: 317,
      topic: "Cardiovascular",
      successRate: 35,
    },
  ],
};
