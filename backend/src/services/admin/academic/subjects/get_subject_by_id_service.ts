import prisma from "../../../../lib/prisma";

export const getSubjectByIdService = async (id: number) => {
  const subject = await prisma.subject.findUnique({
    where: {
      id,
    },

    include: {
      faculties: {
        include: {
          faculty: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },

      sectionSubjects: {
        include: {
          section: {
            include: {
              studentRecords: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },

      exams: {
        where: {
          isArchived: false,
        },
      },
    },
  });

  if (!subject) {
    return null;
  }

  const totalSections = subject.sectionSubjects.length;

  const totalStudents = subject.sectionSubjects.reduce(
    (total, item) => total + item.section.studentRecords.length,
    0,
  );

  const totalAssessments = subject.exams.length;

  return {
    id: subject.id,
    name: subject.name,
    code: subject.code,
    description: subject.description,

    faculties: subject.faculties.map((faculty) => ({
      id: faculty.faculty.id,
      name: faculty.faculty.name,
    })),

    sectionSummary: {
      totalSections,
      totalStudents,
    },

    assessmentSummary: {
      totalAssessments,
    },

    questionBankSummary: {
      totalQuestions: 0,
    },

    analytics: {
      readinessScore: 0,
      status: "COMING_SOON",
    },
  };
};
