export const mockQuestionDetails = {
  id: 1001,

  question:
    "Which drug classification does Metoprolol belong to?",

  topic: "Pharmacology",

  difficulty: "MEDIUM",

  successRate: 74,

  attempts: 682,

  assessmentsUsed: 12,

  averageTime: "48 sec",

  correct: 505,

  incorrect: 177,

  blockedStudents: {
    easy: 12,
    medium: 28,
    hard: 19,
    expert: 6,
  },

  // ======================
  // Assessment Performance
  // ======================

  assessmentPerformance: {
    totalAssessments: 12,

    averageSuccessRate: 74,

    highestSuccessRate: 92,

    lowestSuccessRate: 41,

    mostUsedAssessment: "Pharmacology Mock Board A",

    coverage: {
      mocks: 6,
      quizzes: 3,
      midterms: 2,
      finals: 1,
    },
  },

  // ======================
  // Common Mistakes Summary
  // ======================

  answerDistribution: [
    {
      choice: "A",
      answer: "Beta Blocker",
      count: 505,
      correct: true,
    },

    {
      choice: "B",
      answer: "Beta Agonist",
      count: 187,
      correct: false,
    },

    {
      choice: "C",
      answer: "ACE Inhibitor",
      count: 96,
      correct: false,
    },

    {
      choice: "D",
      answer: "Calcium Channel Blocker",
      count: 58,
      correct: false,
    },
  ],

  mistakes: [
    {
      choice: "Beta Agonist",

      count: 187,

      explanation:
        "Students confused beta blockers with beta agonists.",
    },

    {
      choice: "Calcium Channel Blocker",

      count: 96,

      explanation:
        "Incorrect identification of cardiovascular drug classes.",
    },

    {
      choice: "ACE Inhibitor",

      count: 58,

      explanation:
        "Associated with similar hypertension treatment concepts.",
    },
  ],

  usage: [
    {
      assessment: "Pharmacology Midterm",

      attempts: 180,

      successRate: 92,
    },

    {
      assessment: "Nursing Mock Exam",

      attempts: 140,

      successRate: 78,
    },

    {
      assessment: "Final Board Assessment",

      attempts: 220,

      successRate: 41,
    },
  ],
};
