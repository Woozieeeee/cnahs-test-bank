import { Request, Response } from "express";
import prisma from "../../../../lib/prisma";

/**
 * GET /api/admin/academic/sections/:sectionId/subjects
 * Get all subjects taught in a section
 */
export const getSectionSubjectsController = async (
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

    // Get all subjects for this section
    const sectionSubjects = await prisma.sectionSubject.findMany({
      where: { sectionId },
      include: {
        subject: {
          select: {
            id: true,
            name: true,
            code: true,
            description: true,
            totalQuestions: true,
            totalExams: true,
            exams: {
              where: { sectionId, isArchived: false },
              select: { id: true },
            },
            questions: {
              where: { isArchived: false },
              select: { id: true },
            },
          },
        },
        faculty: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        subject: {
          name: "asc",
        },
      },
    });

    // Format response
    const subjects = sectionSubjects.map((ss) => ({
      id: ss.subject.id,
      name: ss.subject.name,
      code: ss.subject.code,
      description: ss.subject.description,
      totalQuestions: ss.subject.questions.length,
      totalExams: ss.subject.exams.length,
      faculty: ss.faculty
        ? {
            id: ss.faculty.id,
            name: ss.faculty.name,
          }
        : null,
    }));

    // Calculate section-level statistics
    const sectionStats = {
      totalSubjects: subjects.length,
      totalQuestions: subjects.reduce((sum, s) => sum + s.totalQuestions, 0),
      totalExams: subjects.reduce((sum, s) => sum + s.totalExams, 0),
      assignedFaculty: sectionSubjects.filter((ss) => ss.faculty).length,
    };

    return res.status(200).json({
      success: true,
      data: {
        section: {
          id: section.id,
          name: section.name,
        },
        subjects,
        stats: sectionStats,
      },
    });
  } catch (error) {
    console.error("Error fetching section subjects:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch section subjects",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
