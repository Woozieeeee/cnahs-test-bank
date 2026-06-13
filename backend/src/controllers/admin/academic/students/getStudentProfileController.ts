import { Request, Response } from "express";
import prisma from "../../../../lib/prisma";

/**
 * GET /api/admin/students/:studentId/profile
 * Get a student's full profile with enrollment and performance data
 */
export const getStudentProfileController = async (
  req: Request,
  res: Response
) => {
  try {
    const studentIdParam = Array.isArray(req.params.studentId)
      ? req.params.studentId[0]
      : req.params.studentId;
    const studentId = parseInt(studentIdParam, 10);

    if (isNaN(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    // Get student with profile info
    const student = await prisma.user.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        username: true,
        studentId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!student || student.studentId === null) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Get enrollments
    const enrollments = await prisma.section.findMany({
      where: {
        users: {
          some: { id: studentId },
        },
      },
      select: {
        id: true,
        name: true,
        sectionCode: true,
        yearLevel: true,
        program: true,
      },
    });

    // Get exam attempts
    const examAttempts = await prisma.examAttempt.findMany({
      where: { studentId },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            subject: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: { startedAt: "desc" },
      take: 10,
    });

    // Calculate performance stats
    const totalAttempts = await prisma.examAttempt.count({
      where: { studentId },
    });

    const passedAttempts = await prisma.examAttempt.count({
      where: {
        studentId,
        passed: true,
      },
    });

    const averageScore = await prisma.examAttempt.aggregate({
      where: { studentId },
      _avg: { score: true },
    });

    // Get recent violations
    const violations = await prisma.examViolation.findMany({
      where: { studentId },
      select: {
        id: true,
        type: true,
        severity: true,
        description: true,
        timestamp: true,
        resolved: true,
      },
      orderBy: { timestamp: "desc" },
      take: 5,
    });

    return res.status(200).json({
      success: true,
      data: {
        profile: {
          id: student.id,
          name: student.name,
          email: student.username || `${student.studentId}@example.com`,
          studentId: student.studentId,
          accountAge: Math.floor((Date.now() - student.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
          createdAt: student.createdAt,
          updatedAt: student.updatedAt,
        },
        enrollments: {
          count: enrollments.length,
          sections: enrollments.map((sec) => ({
            id: sec.id,
            name: sec.name,
            code: sec.sectionCode,
            academicYear: `Year ${sec.yearLevel}`,
            semester: sec.program,
          })),
        },
        performance: {
          totalAttempts,
          passedAttempts,
          passRate: totalAttempts > 0 ? (passedAttempts / totalAttempts) * 100 : 0,
          averageScore: averageScore._avg.score || 0,
        },
        recentExams: examAttempts.map((attempt) => ({
          id: attempt.id,
          examId: attempt.exam.id,
          examTitle: attempt.exam.title,
          subjectName: attempt.exam.subject.name,
          subjectSlug: attempt.exam.subject.slug,
          score: attempt.score,
          status: attempt.status,
          submittedAt: attempt.submittedAt,
          startedAt: attempt.startedAt,
        })),
        recentViolations: violations.map((v: any) => ({
          id: v.id,
          type: v.type,
          severity: v.severity,
          description: v.description,
          resolved: v.resolved,
          timestamp: v.timestamp,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student profile",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
