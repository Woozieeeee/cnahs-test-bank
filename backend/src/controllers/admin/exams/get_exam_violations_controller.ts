import { Request, Response } from "express";
import { getExamViolationsService } from "../../../services/admin/exams/get_exam_violations_service";

export const getExamViolationsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const examIdParam = Array.isArray(req.params.examId)
      ? req.params.examId[0]
      : req.params.examId;
    const examId = parseInt(examIdParam);

    if (isNaN(examId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam ID",
      });
    }

    const violationsData = await getExamViolationsService(examId);

    return res.json({
      success: true,
      data: violationsData,
    });
  } catch (error) {
    console.error("[AdminExamViolations] Error:", error);

    if (error instanceof Error && error.message === "Exam not found") {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch exam violations.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
