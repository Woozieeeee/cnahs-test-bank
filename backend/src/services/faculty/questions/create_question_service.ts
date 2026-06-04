import prisma from "../../../lib/prisma";

interface CreateQuestionData {
  facultyId: number;

  topicId: number;

  question: string;

  explanation?: string;

  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  options: string[];

  correctAnswer: string;
}

export const createQuestionService = async ({
  facultyId,
  topicId,
  question,
  explanation,
  difficulty,
  options,
  correctAnswer,
}: CreateQuestionData) => {
  const topic = await prisma.topic.findFirst({
    where: {
      id: topicId,

      subject: {
        faculties: {
          some: {
            facultyId,
          },
        },
      },
    },

    include: {
      subject: true,
    },
  });

  if (!topic) {
    throw new Error("Topic not found");
  }

  if (options.length !== 4) {
    throw new Error("Exactly 4 options are required");
  }

  const answerExists = options.some(
    (option) => option.trim() === correctAnswer.trim(),
  );

  if (!answerExists) {
    throw new Error("Correct answer must match one of the options");
  }

  const createdQuestion = await prisma.question.create({
    data: {
      subjectId: topic.subjectId,

      topicId,

      question,

      explanation,

      difficulty,

      correctAnswer,

      options: {
        create: options.map((option) => ({
          optionText: option,

          isCorrect: option.trim() === correctAnswer.trim(),
        })),
      },
    },

    include: {
      options: true,
    },
  });

  await prisma.topic.update({
    where: {
      id: topicId,
    },

    data: {
      totalQuestions: {
        increment: 1,
      },
    },
  });

  await prisma.subject.update({
    where: {
      id: topic.subjectId,
    },

    data: {
      totalQuestions: {
        increment: 1,
      },
    },
  });

  return createdQuestion;
};
