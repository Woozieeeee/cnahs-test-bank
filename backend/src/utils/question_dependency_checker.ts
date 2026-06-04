import prisma from "../lib/prisma";

export const getQuestionDependencies = async (questionId: number) => {
  const examQuestions = await prisma.examQuestion.findMany({
    where: {
      questionId,

      exam: {
        status: {
          in: ["DRAFT", "SCHEDULED", "ONGOING"],
        },
      },
    },

    include: {
      exam: {
        include: {
          subject: {
            select: {
              name: true,
            },
          },

          section: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    examCount: examQuestions.length,

    exams: examQuestions.map((item) => ({
      id: item.exam.id,

      title: item.exam.title,

      status: item.exam.status,

      subject: item.exam.subject.name,

      section: item.exam.section.name,
    })),
  };
};
