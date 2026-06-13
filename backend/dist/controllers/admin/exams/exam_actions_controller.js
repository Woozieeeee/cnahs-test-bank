"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSendAnnouncementController = exports.adminNotifyStudentController = exports.adminUnlockStudentController = exports.adminFlagStudentController = exports.adminEndExamController = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const notification_service_1 = require("../../../services/notification/notification_service");
const notification_types_1 = require("../../../services/notification/notification_types");
const faculty_notification_handler_1 = require("../../../services/notification/faculty_notification_handler");
const student_notification_handler_1 = require("../../../services/notification/student_notification_handler");
const admin_notification_handler_1 = require("../../../services/notification/admin_notification_handler");
const adminEndExamController = async (req, res) => {
    try {
        const examId = parseInt(req.params.examId);
        const { force } = req.body;
        const exam = await prisma_1.default.exam.findFirst({
            where: { id: examId },
            include: { attempts: { where: { status: "IN_PROGRESS" } } },
        });
        if (!exam)
            throw new Error("Exam not found");
        if (force) {
            await prisma_1.default.examAttempt.updateMany({
                where: { examId, status: "IN_PROGRESS" },
                data: { status: "AUTO_SUBMITTED", submittedAt: new Date() },
            });
        }
        await prisma_1.default.exam.update({
            where: { id: examId },
            data: { status: "COMPLETED", endsAt: new Date(), updatedAt: new Date() },
        });
        return res.status(200).json({
            success: true,
            message: `Exam ${force ? "force-ended" : "ended"} successfully`,
            affectedStudents: exam.attempts.length,
        });
    }
    catch (error) {
        console.error("Failed to end exam:", error);
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.adminEndExamController = adminEndExamController;
const adminFlagStudentController = async (req, res) => {
    try {
        const examId = parseInt(req.params.examId);
        const { studentId, reason } = req.body;
        const attempt = await prisma_1.default.examAttempt.findFirst({
            where: { examId, studentId, status: "IN_PROGRESS" },
        });
        if (!attempt)
            throw new Error("Student not found or not actively taking the exam");
        const [, violation] = await Promise.all([
            prisma_1.default.examAttempt.update({
                where: { id: attempt.id },
                data: { status: "FLAGGED" },
            }),
            prisma_1.default.examViolation.create({
                data: {
                    examId,
                    studentId,
                    type: "SUSPICIOUS_ACTIVITY",
                    severity: "HIGH",
                    description: reason || "Manually flagged by admin",
                    details: `Student flagged by admin`,
                    resolved: false,
                    timestamp: new Date(),
                },
            }),
        ]);
        void faculty_notification_handler_1.facultyNotificationHandler
            .notifyViolationDetected(violation.id)
            .catch((error) => {
            console.error("Failed to send faculty violation notification:", error);
        });
        void student_notification_handler_1.studentNotificationHandler
            .notifyExamFlagged(violation.id)
            .catch((error) => {
            console.error("Failed to send student violation notification:", error);
        });
        void admin_notification_handler_1.adminNotificationHandler
            .notifyExamViolationEscalation(examId, studentId, 1, reason || "Manual admin flag")
            .catch((error) => {
            console.error("Failed to send admin violation notification:", error);
        });
        return res
            .status(200)
            .json({ success: true, message: "Student flagged successfully" });
    }
    catch (error) {
        console.error("Failed to flag student:", error);
        const errorMessage = error.message;
        if (errorMessage.includes("not found") ||
            errorMessage.includes("not actively")) {
            return res.status(404).json({ message: errorMessage });
        }
        return res.status(400).json({
            message: errorMessage,
        });
    }
};
exports.adminFlagStudentController = adminFlagStudentController;
const adminUnlockStudentController = async (req, res) => {
    try {
        const examId = parseInt(req.params.examId);
        const { studentId } = req.body;
        const attempt = await prisma_1.default.examAttempt.findFirst({
            where: { examId, studentId, status: "FLAGGED" },
        });
        if (!attempt)
            throw new Error("Student not found or not flagged");
        await Promise.all([
            prisma_1.default.examAttempt.update({
                where: { id: attempt.id },
                data: { status: "IN_PROGRESS" },
            }),
            prisma_1.default.examViolation.updateMany({
                where: {
                    examId,
                    studentId,
                    type: "SUSPICIOUS_ACTIVITY",
                    resolved: false,
                },
                data: { resolved: true, resolvedAt: new Date(), resolvedBy: `Admin` },
            }),
        ]);
        return res
            .status(200)
            .json({ success: true, message: "Student unlocked successfully" });
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
exports.adminUnlockStudentController = adminUnlockStudentController;
const adminNotifyStudentController = async (req, res) => {
    try {
        const examId = parseInt(req.params.examId);
        const { studentId, message } = req.body;
        const exam = await prisma_1.default.exam.findFirst({
            where: { id: examId },
        });
        if (!exam)
            throw new Error("Exam not found");
        const attempt = await prisma_1.default.examAttempt.findFirst({
            where: { examId, studentId },
        });
        if (!attempt)
            throw new Error("Student not found in this exam");
        const notification = await notification_service_1.notificationService.createNotification(studentId, {
            type: notification_types_1.NotificationType.EXAM_NOTIFICATION,
            title: `Message from ${exam.title} admin`,
            message,
            metadata: { examId, timestamp: new Date() },
            priority: "MEDIUM",
        });
        if (!notification) {
            return {
                success: true,
                message: "Student has notifications disabled; message was not delivered",
            };
        }
        return res
            .status(200)
            .json({ success: true, message: "Notification sent successfully" });
    }
    catch (error) {
        console.error("Failed to notify student:", error);
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.adminNotifyStudentController = adminNotifyStudentController;
const adminSendAnnouncementController = async (req, res) => {
    try {
        const examId = parseInt(req.params.examId);
        const { message } = req.body;
        const exam = await prisma_1.default.exam.findFirst({
            where: {
                id: examId,
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
            return res.status(404).json({
                message: "Exam not found",
            });
        }
        const studentIds = exam.attempts.map((attempt) => attempt.studentId);
        const notifications = await notification_service_1.notificationService.createBulkNotifications(studentIds, {
            type: notification_types_1.NotificationType.EXAM_ANNOUNCEMENT,
            title: `Announcement from ${exam.title}`,
            message,
            metadata: {
                examId,
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
exports.adminSendAnnouncementController = adminSendAnnouncementController;
