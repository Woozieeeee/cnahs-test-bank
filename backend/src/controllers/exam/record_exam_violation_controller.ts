import { Request, Response } from "express";

import { recordExamViolation } from "../../services/activity/record_exam_violation_service";

export const recordExamViolationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { violation, metadata } = req.body;

    const studentName = "Student";

    await recordExamViolation({
      violation,

      studentName,

      metadata,
    });

    return res.json({
      message: "Violation recorded successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to record violation.",
    });
  }
};
