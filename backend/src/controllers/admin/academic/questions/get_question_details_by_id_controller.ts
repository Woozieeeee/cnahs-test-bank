import { Request, Response } from "express";
import prisma from "../../../../lib/prisma";

/**
 * GET /api/admin/academic/questions/:questionId
 * Get detailed information about a specific question
 */
export const getQuestionDetailsByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const questionIdParam = Array.isArray(req.params.questionId)
      ? req.params.questionId[0]
      : req.params.questionId;
    const questionId = parseInt(questionIdParam, 10);

    if (isNaN(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    // Fetch question with all details
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        options: {
          select: {
            id: true,
            optionText: true,
            isCorrect: true,
          },
        },
        topic: {
          select: {
            id: true,
            name: true,
          },
        },
        examQuestions: {
          include: {
            exam: {
              select: {
                id: true,
                title: true,
                section: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        studentAnswers: {
          include: {
            attempt: {
              select: {
                student: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Calculate performance metrics
    const totalAttempts = question.studentAnswers.length;
    const correctAttempts = question.studentAnswers.filter(
      (a) => a.isCorrect
    ).length;
    const successRate =
      totalAttempts > 0
        ? Math.round((correctAttempts / totalAttempts) * 100)
        : 0;

    // Group attempts by correctness
    const attemptsByStatus = {
      correct: correctAttempts,
      incorrect: totalAttempts - correctAttempts,
    };

    // Get recent attempts
    const recentAttempts = question.studentAnswers
      .slice(-10)
      .reverse()
      .map((a) => ({
        id: a.id,
        studentName: a.attempt.student.name,
        isCorrect: a.isCorrect,
      }));

    // Get exams this question appears in
    const exams = question.examQuestions.map((eq) => ({
      id: eq.exam.id,
      title: eq.exam.title,
      section: eq.exam.section,
    }));

    return res.status(200).json({
      success: true,
      data: {
        question: {
          id: question.id,
          text: question.question,
          topic: question.topic.name,
          difficulty: question.difficulty,
          options: question.options,
          explanation: question.explanation,
          isArchived: question.isArchived,
        },
        exams,
        performance: {
          totalAttempts,
          correctAttempts,
          incorrectAttempts: totalAttempts - correctAttempts,
          successRate,
          attemptsByStatus,
        },
        recentAttempts,
      },
    });
  } catch (error) {
    console.error("Error fetching question details:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch question details",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
