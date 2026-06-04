import prisma from "../../../lib/prisma";

export const getSubjectsService = async (facultyId: number) => {
  const subjects = await prisma.subject.findMany({
    where: {
      faculties: {
        some: {
          facultyId,
        },
      },
    },

    include: {
      questions: true,

      exams: true,

      sectionSubjects: {
        include: {
          section: {
            include: {
              users: {
                where: {
                  role: "STUDENT",
                },
              },
            },
          },
        },
      },
    },

    orderBy: {
      name: "asc",
    },
  });

  return subjects.map((subject) => ({
    id: subject.id,

    code: subject.code,

    name: subject.name,

    description: subject.description,

    totalSections: subject.sectionSubjects.length,

    totalStudents: subject.sectionSubjects.reduce(
      (sum, sectionSubject) => sum + sectionSubject.section.users.length,
      0,
    ),

    totalQuestions: subject.questions.length,

    totalAssessments: subject.exams.length,
  }));
};
