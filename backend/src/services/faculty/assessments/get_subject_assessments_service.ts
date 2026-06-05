import prisma from "../../../lib/prisma";

export const getSubjectAssessmentsService = async (
  facultyId: number,
  subjectId: number,
) => {
  const subject = await prisma.subject.findFirst({
    where: {
      id: subjectId,

      faculties: {
        some: {
          facultyId,
        },
      },
    },
  });

  if (!subject) {
    throw new Error("Subject not found.");
  }

  const assessments = await prisma.exam.findMany({
    where: {
      subjectId,
    },

    include: {
      section: {
        select: {
          id: true,
          name: true,
        },
      },

      _count: {
        select: {
          examQuestions: true,
          attempts: true,
        },
      },
    },
  });

  const sections = await prisma.sectionSubject.findMany({
    where: {
      subjectId,
      facultyId,
    },

    select: {
      section: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const statusOrder = {
    DRAFT: 1,
    SCHEDULED: 2,
    ONGOING: 3,
    COMPLETED: 4,
    ARCHIVED: 5,
  };

  const difficultyOrder = {
    EASY: 1,
    MEDIUM: 2,
    HARD: 3,
    EXPERT: 4,
  };

  const sortedAssessments = assessments.sort((a, b) => {
    const statusComparison = statusOrder[a.status] - statusOrder[b.status];

    if (statusComparison !== 0) {
      return statusComparison;
    }

    const difficultyComparison =
      difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];

    if (difficultyComparison !== 0) {
      return difficultyComparison;
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return {
    assessments: sortedAssessments,

    sections: sections.map(({ section }) => section),
  };
};
