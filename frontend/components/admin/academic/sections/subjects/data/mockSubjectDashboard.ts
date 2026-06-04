export const mockSubjectDashboard = {
  // =========================
  // BOARD READINESS
  // =========================

  averageRating: 78,

  passingRate: 82,

  expertReadyStudents: 12,

  atRiskStudents: 8,

  // =========================
  // PERFORMANCE SUMMARY
  // =========================

  progression: {
    easy: 92,

    medium: 84,

    hard: 71,

    expert: 58,
  },

  // =========================
  // ASSESSMENTS
  // =========================

  assessments: {
    total: 12,

    ongoing: 2,

    completed: 10,
  },

  // =========================
  // QUESTION BANK
  // =========================

  questions: {
    total: 480,

    easy: 120,

    medium: 120,

    hard: 120,

    expert: 120,
  },

  // =========================
  // TOPICS
  // =========================

  weakestTopics: [
    {
      name: "Pharmacology",

      successRate: 34,
    },

    {
      name: "Patient Assessment",

      successRate: 41,
    },

    {
      name: "Maternal Care",

      successRate: 49,
    },
  ],

  strongestTopics: [
    {
      name: "Vital Signs",

      successRate: 94,
    },

    {
      name: "Nursing Process",

      successRate: 91,
    },

    {
      name: "Infection Control",

      successRate: 89,
    },
  ],
};
