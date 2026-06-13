import { Request, Response } from "express";
import prisma from "../../../../lib/prisma";

/**
 * GET /api/admin/academic/sections/:sectionId/students
 * Get all students in a section with their status
 */
export const getSectionStudentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const sectionIdParam = Array.isArray(req.params.sectionId)
      ? req.params.sectionId[0]
      : req.params.sectionId;
    const sectionId = parseInt(sectionIdParam, 10);

    if (isNaN(sectionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid section ID",
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

    // Get all users in this section
    const students = await prisma.user.findMany({
      where: { sectionId },
      select: {
        id: true,
        name: true,
        studentId: true,
        status: true,
        createdAt: true,
        examAttempts: {
          where: {
            exam: {
              sectionId,
              isArchived: false,
            },
          },
          select: {
            score: true,
            status: true,
            exam: {
              select: {
                difficulty: true,
                passingScore: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    // Calculate status for each student based on exam performance
    const studentsWithStatus = students.map((student) => {
      let studentStatus = "PASSING";
      
      const totalAttempts = student.examAttempts.length;
      
      // INACTIVE: Student has NO exam attempts (not participating)
      if (totalAttempts === 0) {
        studentStatus = "INACTIVE";
      } else {
        // Calculate pass rate
        const passedExams = student.examAttempts.filter(
          (attempt) => attempt.score >= attempt.exam.passingScore
        );
        
        const passRate = (passedExams.length / totalAttempts) * 100;
        
        // STRUGGLING: Pass rate < 70% (below standards)
        if (passRate < 70) {
          studentStatus = "STRUGGLING";
        }
        // PASSING: Pass rate >= 70% (meeting standards)
        else {
          studentStatus = "PASSING";
        }
      }

      return {
        id: student.id,
        name: student.name,
        studentId: student.studentId,
        accountStatus: student.status,
        studentStatus,
        totalAttempts: student.examAttempts.length,
        passedExams: student.examAttempts.filter(
          (a) => a.score >= a.exam.passingScore
        ).length,
        enrolledDate: student.createdAt,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        section: {
          id: section.id,
          name: section.name,
        },
        students: studentsWithStatus,
        total: studentsWithStatus.length,
        stats: {
          passing: studentsWithStatus.filter(
            (s) => s.studentStatus === "PASSING"
          ).length,
          inactive: studentsWithStatus.filter(
            (s) => s.studentStatus === "INACTIVE"
          ).length,
          struggling: studentsWithStatus.filter(
            (s) => s.studentStatus === "STRUGGLING"
          ).length,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching section students:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch section students",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
