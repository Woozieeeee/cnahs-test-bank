"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordExamViolationController = void 0;
const record_live_exam_violation_service_1 = require("../../services/exam/record_live_exam_violation_service");
/**
 * Legacy route: POST /exam/violations
 * Prefer POST /api/student/exams/:examId/violations
 */
const recordExamViolationController = async (req, res) => {
    try {
        const studentId = req.user?.id;
        const studentName = req.user?.name ?? "Student";
        if (!studentId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (req.user?.role !== "STUDENT") {
            return res.status(403).json({ message: "Forbidden" });
        }
        const { violation, type, description, severity, metadata, examId } = req.body;
        const violationType = type ?? violation;
        const parsedExamId = parseInt(String(examId), 10);
        if (!violationType || typeof violationType !== "string") {
            return res.status(400).json({ message: "Violation type is required" });
        }
        if (isNaN(parsedExamId)) {
            return res.status(400).json({ message: "examId is required" });
        }
        const result = await (0, record_live_exam_violation_service_1.recordLiveExamViolation)({
            examId: parsedExamId,
            studentId,
            studentName,
            type: violationType,
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
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : "Failed to record violation.";
        if (message === "Exam not found") {
            return res.status(404).json({ message });
        }
        if (message === "Exam already submitted") {
            return res.status(400).json({ message });
        }
        return res.status(500).json({ message: "Failed to record violation." });
    }
};
exports.recordExamViolationController = recordExamViolationController;
