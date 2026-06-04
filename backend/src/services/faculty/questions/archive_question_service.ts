import prisma from "../../../lib/prisma";

import { getQuestionDependencies } from "../../../utils/question_dependency_checker";

export const archiveQuestionService = async (
  facultyId: number,
  questionId: number,
) => {
  const question = await prisma.question.findFirst({
    where: {
      id: questionId,

      subject: {
        faculties: {
          some: {
            facultyId,
          },
        },
      },
    },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  const dependencies = await getQuestionDependencies(questionId);

  if (dependencies.exams.length > 0) {
    const error: any = new Error("Question has active dependencies");

    error.dependencies = dependencies;

    throw error;
  }

  return prisma.question.update({
    where: {
      id: questionId,
    },

    data: {
      isArchived: true,
    },
  });
};
