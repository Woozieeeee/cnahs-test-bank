import { Request, Response } from "express";
import { getExamData } from "../../services/student/student_exam_service";

/**
 * GET /api/student/exams/:examId
 * Get exam details with faculty-configured settings and questions
 */
export const getExamController = async (req: Request, res: Response) => {
  try {
    const studentId = (req as any).user?.id;
    const examIdParam = Array.isArray(req.params.examId)
      ? req.params.examId[0]
      : req.params.examId;
    const examId = parseInt(examIdParam);

    console.log("[ExamController] Student ID:", studentId, "Exam ID:", examId);

    if (!studentId) {
      console.error("[ExamController] No student ID found in auth");
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Student ID not found",
      });
    }

    if (isNaN(examId)) {
      console.error("[ExamController] Invalid exam ID:", examIdParam);
      return res.status(400).json({
        success: false,
        message: "Invalid exam ID",
      });
    }

    const examData = await getExamData(examId);

    if (!examData) {
      console.error(
        `[ExamController] Exam not found for exam ${examId}`
      );
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: examData,
    });
  } catch (error) {
    console.error("[ExamController] Error fetching exam:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch exam data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
