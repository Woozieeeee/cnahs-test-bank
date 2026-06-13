import { Response } from "express";
import type { AuthRequest } from "../../middleware/auth_middleware";
import { recordLiveExamViolation } from "../../services/exam/record_live_exam_violation_service";

export const recordStudentExamViolationController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const studentId = req.user?.id;
    const studentName = req.user?.name ?? "Student";

    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const examIdParam = Array.isArray(req.params.examId)
      ? req.params.examId[0]
      : req.params.examId;
    const examId = parseInt(examIdParam, 10);

    if (isNaN(examId)) {
      return res.status(400).json({ message: "Invalid exam ID" });
    }

    const { type, description, severity, metadata } = req.body;

    if (!type || typeof type !== "string") {
      return res.status(400).json({ message: "Violation type is required" });
    }

    const result = await recordLiveExamViolation({
      examId,
      studentId,
      studentName,
      type,
      description,
      severity,
      metadata,
    });

    return res.json({
      message: result.deduplicated
        ? "Duplicate violation ignored."
        : "Violation recorded successfully.",
      ...result,
    });
  } catch (error) {
    console.error("Failed to record live exam violation:", error);

    const message =
      error instanceof Error ? error.message : "Failed to record violation.";

    if (message === "Exam not found") {
      return res.status(404).json({ message });
    }

    if (message === "Exam already submitted") {
      return res.status(400).json({ message });
    }

    return res.status(500).json({ message: "Failed to record violation." });
  }
};
