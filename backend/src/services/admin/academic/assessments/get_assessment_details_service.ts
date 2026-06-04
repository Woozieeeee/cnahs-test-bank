import prisma from "../../../../lib/prisma";

export const getAssessmentDetailsService = async (assessmentId: number) => {
  const exam = await prisma.exam.findUnique({
    where: {
      id: assessmentId,
    },

    include: {
      attempts: {
        include: {
          answers: {
            include: {
              question: {
                include: {
                  topic: true,
                },
              },
            },
          },
        },
      },

      examQuestions: {
        include: {
          question: {
            include: {
              topic: true,
            },
          },
        },
      },
    },
  });

  if (!exam) {
    throw new Error("Assessment not found");
  }

  const scores = exam.attempts.map((attempt) => attempt.score);

  const students = scores.length;

  const averageScore =
    students === 0
      ? 0
      : Math.round(scores.reduce((sum, score) => sum + score, 0) / students);

  const highestScore = students === 0 ? 0 : Math.max(...scores);

  const lowestScore = students === 0 ? 0 : Math.min(...scores);

  const passingStudents = exam.attempts.filter(
    (attempt) => attempt.score >= exam.passingScore,
  ).length;

  const passingRate =
    students === 0 ? 0 : Math.round((passingStudents / students) * 100);

  const questionStats = await Promise.all(
    exam.examQuestions.map(async (examQuestion) => {
      const question = examQuestion.question;

      const answers = await prisma.studentAnswer.findMany({
        where: {
          questionId: question.id,

          attempt: {
            examId: exam.id,
          },
        },
      });

      const attempts = answers.length;

      const correctAnswers = answers.filter(
        (answer) => answer.isCorrect,
      ).length;

      const successRate =
        attempts === 0 ? 0 : Math.round((correctAnswers / attempts) * 100);

      return {
        id: question.id,

        question: question.question,

        topic: question.topic.name,

        successRate,
      };
    }),
  );

  const weakestQuestions = questionStats
    .sort((a, b) => a.successRate - b.successRate)
    .slice(0, 5);

  return {
    id: exam.id,

    title: exam.title,

    difficulty: exam.difficulty,

    status: exam.status,

    duration: exam.duration,

    passingScore: exam.passingScore,

    randomizeQuestions: exam.randomizeQuestions,

    randomizeOptions: exam.randomizeOptions,

    students,

    averageScore,

    passingRate,

    highestScore,

    lowestScore,

    weakestQuestions,
  };
};
