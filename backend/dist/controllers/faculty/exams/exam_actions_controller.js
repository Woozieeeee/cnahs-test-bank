"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAnnouncementController = exports.resetViolationsController = exports.markViolationResolvedController = exports.exportExamReportController = exports.notifyStudentController = exports.unlockStudentController = exports.flagStudentController = exports.endExamController = exports.pauseExamController = void 0;
const exam_actions_service_1 = require("../../../services/faculty/exams/exam_actions_service");
const exam_violations_service_1 = require("../../../services/faculty/exams/exam_violations_service");
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const notification_service_1 = require("../../../services/notification/notification_service");
const notification_types_1 = require("../../../services/notification/notification_types");
const pauseExamController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const examId = parseInt(req.params.examId);
        const result = await (0, exam_actions_service_1.pauseExamService)(examId, facultyId);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error("Failed to pause exam:", error);
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.pauseExamController = pauseExamController;
const endExamController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const examId = parseInt(req.params.examId);
        const { force } = req.body;
        const result = await (0, exam_actions_service_1.endExamService)(examId, facultyId, force);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error("Failed to end exam:", error);
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.endExamController = endExamController;
const flagStudentController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const examId = parseInt(req.params.examId);
        const { studentId, reason } = req.body;
        const result = await (0, exam_actions_service_1.flagStudentService)(examId, facultyId, studentId, reason);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error("Failed to flag student:", error);
        const errorMessage = error.message;
        if (errorMessage.includes("not found") || errorMessage.includes("not actively")) {
            return res.status(404).json({ message: errorMessage });
        }
        return res.status(400).json({
            message: errorMessage,
        });
    }
};
exports.flagStudentController = flagStudentController;
const unlockStudentController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const examId = parseInt(req.params.examId);
        const { studentId } = req.body;
        const result = await (0, exam_actions_service_1.unlockStudentService)(examId, facultyId, studentId);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error("Failed to unlock student:", error);
        const errorMessage = error.message;
        if (errorMessage.includes("not found")) {
            return res.status(404).json({ message: errorMessage });
        }
        return res.status(400).json({
            message: errorMessage,
        });
    }
};
exports.unlockStudentController = unlockStudentController;
const notifyStudentController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const examId = parseInt(req.params.examId);
        const { studentId, message } = req.body;
        const result = await (0, exam_actions_service_1.notifyStudentService)(examId, facultyId, studentId, message);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error("Failed to notify student:", error);
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.notifyStudentController = notifyStudentController;
const exportExamReportController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const examId = parseInt(req.params.examId);
        const reportData = await (0, exam_actions_service_1.exportExamReportService)(examId, facultyId);
        return res.status(200).json(reportData);
    }
    catch (error) {
        console.error("Failed to export exam report:", error);
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.exportExamReportController = exportExamReportController;
const markViolationResolvedController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const violationId = parseInt(req.params.violationId);
        const result = await (0, exam_violations_service_1.markViolationResolvedService)(violationId, facultyId, `Faculty ${facultyId}`);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error("Failed to mark violation as resolved:", error);
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.markViolationResolvedController = markViolationResolvedController;
const resetViolationsController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const examId = parseInt(req.params.examId);
        // Verify exam ownership
        const exam = await prisma_1.default.exam.findFirst({
            where: {
                id: examId,
                OR: [{ createdById: facultyId }, { facultyId }],
            },
        });
        if (!exam) {
            return res.status(403).json({
                message: "Exam not found or unauthorized",
            });
        }
        // Reset all violations for this exam
        const result = await prisma_1.default.examViolation.updateMany({
            where: { examId },
            data: {
                resolved: true,
                resolvedAt: new Date(),
                resolvedBy: `Faculty ${facultyId}`,
            },
        });
        return res.status(200).json({
            success: true,
            message: "All violations reset successfully",
            count: result.count,
        });
    }
    catch (error) {
        console.error("Failed to reset violations:", error);
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.resetViolationsController = resetViolationsController;
const sendAnnouncementController = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const examId = parseInt(req.params.examId);
        const { message } = req.body;
        // Verify exam ownership
        const exam = await prisma_1.default.exam.findFirst({
            where: {
                id: examId,
                OR: [{ createdById: facultyId }, { facultyId }],
            },
            include: {
                attempts: {
                    select: {
                        studentId: true,
                    },
                },
            },
        });
        if (!exam) {
            return res.status(403).json({
                message: "Exam not found or unauthorized",
            });
        }
        const studentIds = exam.attempts.map((attempt) => attempt.studentId);
        const notifications = await notification_service_1.notificationService.createBulkNotifications(studentIds, {
            type: notification_types_1.NotificationType.EXAM_ANNOUNCEMENT,
            title: `Announcement from ${exam.title}`,
            message,
            metadata: {
                examId,
                facultyId,
                timestamp: new Date(),
            },
            priority: "MEDIUM",
        });
        return res.status(200).json({
            success: true,
            message: "Announcement sent successfully",
            sentTo: notifications.length,
        });
    }
    catch (error) {
        console.error("Failed to send announcement:", error);
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.sendAnnouncementController = sendAnnouncementController;
