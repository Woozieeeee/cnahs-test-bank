export const mockSubjects = [
  {
    id: 1,

    name: "Fundamentals of Nursing",

    code: "NCM101",

    faculty: {
      name: "Prof. Maria Santos",
    },

    sectionSubjects: [
      {
        id: 1,

        section: {
          id: 1,

          name: "BSN 1A",
        },
      },
    ],

    exams: [{ id: 1 }, { id: 2 }],

    isArchived: false,
  },

  {
    id: 2,

    name: "Pharmacology",

    code: "PHARMA201",

    faculty: null,

    sectionSubjects: [],

    exams: [],

    isArchived: false,
  },
];
