import prisma from "../../../../lib/prisma";

export const getSubjectsService = async (tab: string) => {
  const subjects = await prisma.subject.findMany({
    where: {
      ...(tab === "ACTIVE" && {
        isArchived: false,
      }),

      ...(tab === "ARCHIVED" && {
        isArchived: true,
      }),
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
              users: {
                select: {
                  id: true,
                  role: true,
                },
              },
            },
          },
        },
      },

      exams: {
        select: {
          id: true,
        },
      },

      questions: {
        select: {
          id: true,
        },
      },
    },

    orderBy: [
      {
        isArchived: "asc",
      },

      {
        updatedAt: "desc",
      },
    ],
  });

  return subjects.map((subject) => {
    const totalStudents = subject.sectionSubjects.reduce(
      (total, assignment) =>
        total +
        assignment.section.users.filter((user) => user.role === "STUDENT")
          .length,
      0,
    );

    return {
      ...subject,

      totalStudents,

      totalQuestions: subject.questions.length,

      totalExams: subject.exams.length,
    };
  });
};
