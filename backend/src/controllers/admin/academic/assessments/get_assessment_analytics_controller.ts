import { Request, Response } from "express";
import prisma from "../../../../lib/prisma";

/**
 * GET /api/admin/academic/sections/:sectionId/subjects/:subjectId/assessments
 * Get assessment/exam analytics for a subject in a section
 */
export const getAssessmentAnalyticsController = async (
  req: Request,
  res: Response
) => {
  try {
    const sectionIdParam = Array.isArray(req.params.sectionId)
      ? req.params.sectionId[0]
      : req.params.sectionId;
    const subjectIdParam = Array.isArray(req.params.subjectId)
      ? req.params.subjectId[0]
      : req.params.subjectId;

    const sectionId = parseInt(sectionIdParam, 10);
    const subjectId = parseInt(subjectIdParam, 10);

    if (isNaN(sectionId) || isNaN(subjectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid section ID or subject ID",
      });
    }

    // Verify section exists
    const section = await prisma.section.findUnique({
      where: { id: sectionId },
      select: { id: true, name: true },
    });

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Verify subject exists
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      select: { id: true, name: true, code: true },
    });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    // Get exams for this subject in this section
    const exams = await prisma.exam.findMany({
      where: {
        sectionId,
        subjectId,
        isArchived: false,
      },
      include: {
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
        examQuestions: {
          select: {
            questionId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate analytics for each exam
    const assessments = exams.map((exam) => {
      const totalAttempts = exam.attempts.length;
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

      return {
        id: exam.id,
        title: exam.title,
        difficulty: exam.difficulty,
        status: exam.status,
        totalQuestions: exam.examQuestions.length,
        totalAttempts,
        passedAttempts,
        averageScore,
        passRate,
        passingScore: exam.passingScore,
        startsAt: exam.startsAt,
        endsAt: exam.endsAt,
        topPerformers: exam.attempts
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map((a) => ({
            studentName: a.student.name,
            score: a.score,
          })),
      };
    });

    // Calculate section-level statistics
    const allAttempts = exams.flatMap((e) => e.attempts);
    const sectionStats = {
      totalExams: exams.length,
      totalAttempts: allAttempts.length,
      averageScore:
        allAttempts.length > 0
          ? Math.round(
              allAttempts.reduce((sum, a) => sum + a.score, 0) /
                allAttempts.length
            )
          : 0,
      overallPassRate:
        allAttempts.length > 0
          ? Math.round(
              (allAttempts.filter((a) => a.score >= 75).length /
                allAttempts.length) *
                100
            )
          : 0,
    };

    return res.status(200).json({
      success: true,
      data: {
        section: {
          id: section.id,
          name: section.name,
        },
        subject: {
          id: subject.id,
          name: subject.name,
          code: subject.code,
        },
        assessments,
        stats: sectionStats,
      },
    });
  } catch (error) {
    console.error("Error fetching assessment analytics:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch assessment analytics",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
