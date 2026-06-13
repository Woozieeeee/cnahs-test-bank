import { Request, Response } from "express";
import prisma from "../../../../lib/prisma";

/**
 * GET /api/admin/academic/exams/:examId
 * Get detailed information about an exam
 */
export const getExamDetailsController = async (
  req: Request,
  res: Response
) => {
  try {
    const examIdParam = Array.isArray(req.params.examId)
      ? req.params.examId[0]
      : req.params.examId;
    const examId = parseInt(examIdParam, 10);

    if (isNaN(examId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam ID",
      });
    }

    // Fetch exam with all details
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        section: {
          select: {
            id: true,
            name: true,
          },
        },
        subject: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        faculty: {
          select: {
            id: true,
            name: true,
          },
        },
        examQuestions: {
          select: {
            question: {
              select: {
                id: true,
                difficulty: true,
              },
            },
          },
        },
        attempts: {
          select: {
            id: true,
            score: true,
            status: true,
            student: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        violations: {
          select: {
            id: true,
            severity: true,
          },
        },
      },
    });

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    // Calculate statistics
    const totalAttempts = exam.attempts.length;
    const completedAttempts = exam.attempts.filter(
      (a) => a.status === "COMPLETED" || a.status === "SUBMITTED"
    ).length;
    const passedAttempts = exam.attempts.filter(
      (a) => a.score >= exam.passingScore
    ).length;

    const averageScore =
      totalAttempts > 0
        ? Math.round(
            exam.attempts.reduce((sum, a) => sum + a.score, 0) /
              totalAttempts
          )
        : 0;

    const passRate =
      totalAttempts > 0
        ? Math.round((passedAttempts / totalAttempts) * 100)
        : 0;

    // Question difficulty breakdown
    const difficultyBreakdown = {
      EASY: exam.examQuestions.filter(
        (eq) => eq.question.difficulty === "EASY"
      ).length,
      MEDIUM: exam.examQuestions.filter(
        (eq) => eq.question.difficulty === "MEDIUM"
      ).length,
      HARD: exam.examQuestions.filter(
        (eq) => eq.question.difficulty === "HARD"
      ).length,
      EXPERT: exam.examQuestions.filter(
        (eq) => eq.question.difficulty === "EXPERT"
      ).length,
    };

    // Violation severity breakdown
    const violationBreakdown = {
      LOW: exam.violations.filter((v) => v.severity === "LOW").length,
      MEDIUM: exam.violations.filter((v) => v.severity === "MEDIUM").length,
      HIGH: exam.violations.filter((v) => v.severity === "HIGH").length,
    };

    // Top performers
    const topPerformers = exam.attempts
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((a) => ({
        studentName: a.student.name,
        score: a.score,
        status: a.status,
      }));

    return res.status(200).json({
      success: true,
      data: {
        exam: {
          id: exam.id,
          title: exam.title,
          description: exam.description,
          difficulty: exam.difficulty,
          duration: exam.duration,
          status: exam.status,
          createdAt: exam.createdAt,
          publishedAt: exam.publishedAt,
          startsAt: exam.startsAt,
          endsAt: exam.endsAt,
          passingScore: exam.passingScore,
          randomizeQuestions: exam.randomizeQuestions,
          randomizeOptions: exam.randomizeOptions,
          showResultAfterSubmission: exam.showResultAfterSubmission,
          showCorrectAnswers: exam.showCorrectAnswers,
          showExplanations: exam.showExplanations,
          requireFullscreen: exam.requireFullscreen,
          detectTabSwitch: exam.detectTabSwitch,
          detectWindowBlur: exam.detectWindowBlur,
        },
        section: exam.section,
        subject: exam.subject,
        createdBy: exam.createdBy,
        faculty: exam.faculty,
        statistics: {
          totalQuestions: exam.examQuestions.length,
          totalAttempts,
          completedAttempts,
          passedAttempts,
          averageScore,
          passRate,
          questionDifficultyBreakdown: difficultyBreakdown,
          violationCount: exam.violations.length,
          violationBreakdown,
        },
        topPerformers,
      },
    });
  } catch (error) {
    console.error("Error fetching exam details:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch exam details",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
