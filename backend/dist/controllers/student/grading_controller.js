"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamGradingController = exports.getTierGradingController = exports.getSubjectGradingController = void 0;
const grading_service_1 = require("../../services/student/grading_service");
/**
 * Get comprehensive grading statistics for a subject
 */
const getSubjectGradingController = async (req, res) => {
    try {
        const studentId = req.user?.id;
        const subjectIdParam = Array.isArray(req.params.subjectId)
            ? req.params.subjectId[0]
            : req.params.subjectId;
        const subjectId = subjectIdParam;
        if (!studentId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const subjectIdNum = parseInt(subjectId, 10);
        if (isNaN(subjectIdNum)) {
            res.status(400).json({
                success: false,
                message: "Invalid subject ID",
            });
            return;
        }
        const gradingStats = await (0, grading_service_1.calculateSubjectGrading)(studentId, subjectIdNum);
        if (!gradingStats) {
            res.status(404).json({
                success: false,
                message: "Subject not found or no grading data available",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: gradingStats,
        });
    }
    catch (error) {
        console.error("[GradingController] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get grading statistics",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getSubjectGradingController = getSubjectGradingController;
/**
 * Get grading statistics for a specific tier
 */
const getTierGradingController = async (req, res) => {
    try {
        const studentId = req.user?.id;
        const subjectIdParam = Array.isArray(req.params.subjectId)
            ? req.params.subjectId[0]
            : req.params.subjectId;
        const tierParam = Array.isArray(req.params.tier)
            ? req.params.tier[0]
            : req.params.tier;
        if (!studentId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const subjectIdNum = parseInt(subjectIdParam, 10);
        if (isNaN(subjectIdNum)) {
            res.status(400).json({
                success: false,
                message: "Invalid subject ID",
            });
            return;
        }
        const validTiers = ["EASY", "MEDIUM", "HARD", "EXPERT"];
        if (!validTiers.includes(tierParam.toUpperCase())) {
            res.status(400).json({
                success: false,
                message: "Invalid tier",
            });
            return;
        }
        const tierGrading = await (0, grading_service_1.calculateTierGrading)(studentId, subjectIdNum, tierParam);
        res.status(200).json({
            success: true,
            data: tierGrading,
        });
    }
    catch (error) {
        console.error("[GradingController] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get tier grading statistics",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getTierGradingController = getTierGradingController;
/**
 * Get grading for a specific exam attempt
 */
const getExamGradingController = async (req, res) => {
    try {
        const studentId = req.user?.id;
        const examIdParam = Array.isArray(req.params.examId)
            ? req.params.examId[0]
            : req.params.examId;
        const attemptIdParam = Array.isArray(req.params.attemptId)
            ? req.params.attemptId[0]
            : req.params.attemptId;
        if (!studentId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const examIdNum = parseInt(examIdParam, 10);
        const attemptIdNum = parseInt(attemptIdParam, 10);
        if (isNaN(examIdNum) || isNaN(attemptIdNum)) {
            res.status(400).json({
                success: false,
                message: "Invalid exam or attempt ID",
            });
            return;
        }
        const gradingMetrics = await (0, grading_service_1.calculateExamGrading)(examIdNum, attemptIdNum);
        if (!gradingMetrics) {
            res.status(404).json({
                success: false,
                message: "Exam attempt not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: gradingMetrics,
        });
    }
    catch (error) {
        console.error("[GradingController] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get exam grading",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getExamGradingController = getExamGradingController;
