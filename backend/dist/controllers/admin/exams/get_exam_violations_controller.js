"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamViolationsController = void 0;
const get_exam_violations_service_1 = require("../../../services/admin/exams/get_exam_violations_service");
const getExamViolationsController = async (req, res) => {
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
        const violationsData = await (0, get_exam_violations_service_1.getExamViolationsService)(examId);
        return res.json({
            success: true,
            data: violationsData,
        });
    }
    catch (error) {
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
exports.getExamViolationsController = getExamViolationsController;
