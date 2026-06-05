import prisma from "../../../lib/prisma";

export const getFacultyExamsService = async (facultyId: number) => {
  const exams = await prisma.exam.findMany({
    where: {
      section: {
        sectionSubjects: {
          some: {
            facultyId,
          },
        },
      },
    },

    include: {
      subject: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },

      section: {
        select: {
          id: true,
          name: true,
        },
      },

      examQuestions: {
        select: {
          id: true,
        },
      },

      attempts: {
        select: {
          score: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return exams.map((exam) => {
    const totalAttempts = exam.attempts.length;

    const averageScore =
      totalAttempts === 0
        ? 0
        : Math.round(
            exam.attempts.reduce((sum, attempt) => sum + attempt.score, 0) /
              totalAttempts,
          );

    return {
      id: exam.id,

      title: exam.title,

      status: exam.status,

      subjectId: exam.subject.id,

      subjectName: exam.subject.name,

      subjectCode: exam.subject.code,

      sectionId: exam.section.id,

      sectionName: exam.section.name,

      totalQuestions: exam.examQuestions.length,

      totalAttempts,

      averageScore,

      startsAt: exam.startsAt,

      endsAt: exam.endsAt,

      createdAt: exam.createdAt,
    };
  });
};
