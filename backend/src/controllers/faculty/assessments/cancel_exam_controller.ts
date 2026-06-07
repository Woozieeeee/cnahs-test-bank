import { Response } from "express";

import { authMiddleware, AuthRequest } from "../../../middleware/auth_middleware";

import { cancelExamService } from "../../../services/faculty/assessments/cancel_exam_service";

export const cancelExamController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user?.id;

    if (!facultyId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const examId = Number(req.params.examId);

    const data = await cancelExamService(examId);

    return res.json(data);
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: error.message || "Failed to cancel exam.",
    });
  }
};
