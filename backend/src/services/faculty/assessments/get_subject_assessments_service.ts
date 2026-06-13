import prisma from "../../../lib/prisma";

const updateExamStatus = (exam: any) => {
  const now = new Date();
  const startTime = exam.startsAt ? new Date(exam.startsAt) : null;
  const endTime = exam.endsAt ? new Date(exam.endsAt) : null;

  if (
    exam.status === "ARCHIVED" ||
    exam.status === "DRAFT" ||
    exam.status === "CANCELLED"
  ) {
    return exam.status;
  }

  if (startTime && endTime) {
    if (now < startTime) {
      return "SCHEDULED";
    } else if (now >= startTime && now < endTime) {
      return "ONGOING";
    } else {
      return "COMPLETED";
    }
  } else if (startTime) {
    if (now < startTime) {
      return "SCHEDULED";
    } else {
      return "ONGOING";
    }
  }

  return exam.status;
};

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

    select: {
      id: true,

      title: true,

      difficulty: true,

      status: true,

      duration: true,

      passingScore: true,

      startsAt: true,

      endsAt: true,

      subjectId: true,

      createdAt: true,

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

  const assessmentsWithDynamicStatus = assessments.map((exam) => ({
    ...exam,
    status: updateExamStatus(exam),
  }));

  const statusOrder = {
    DRAFT: 1,
    SCHEDULED: 2,
    ONGOING: 3,
    COMPLETED: 4,
    ARCHIVED: 5,
    CANCELLED: 6,
  };

  const difficultyOrder = {
    EASY: 1,
    MEDIUM: 2,
    HARD: 3,
    EXPERT: 4,
  };

  const sortedAssessments = assessmentsWithDynamicStatus.sort((a, b) => {
    const statusComparison =
      statusOrder[a.status as keyof typeof statusOrder] -
      statusOrder[b.status as keyof typeof statusOrder];

    if (statusComparison !== 0) {
      return statusComparison;
    }

    const difficultyComparison =
      difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
      difficultyOrder[b.difficulty as keyof typeof difficultyOrder];

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
