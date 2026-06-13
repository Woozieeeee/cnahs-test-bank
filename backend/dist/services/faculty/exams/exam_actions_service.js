"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pauseExamService = pauseExamService;
exports.endExamService = endExamService;
exports.flagStudentService = flagStudentService;
exports.unlockStudentService = unlockStudentService;
exports.notifyStudentService = notifyStudentService;
exports.exportExamReportService = exportExamReportService;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const faculty_notification_handler_1 = require("../../notification/faculty_notification_handler");
const student_notification_handler_1 = require("../../notification/student_notification_handler");
const admin_notification_handler_1 = require("../../notification/admin_notification_handler");
const notification_service_1 = require("../../notification/notification_service");
const notification_types_1 = require("../../notification/notification_types");
async function getExamAuthCheck(examId, facultyId) {
    const exam = await prisma_1.default.exam.findFirst({
        where: { id: examId, OR: [{ createdById: facultyId }, { facultyId }] },
    });
    if (!exam)
        throw new Error("Exam not found or unauthorized");
    return exam;
}
async function pauseExamService(examId, facultyId) {
    await getExamAuthCheck(examId, facultyId);
    await prisma_1.default.exam.update({ where: { id: examId }, data: { updatedAt: new Date() } });
    return { success: true, message: "Exam paused successfully" };
}
async function endExamService(examId, facultyId, force = false) {
    const exam = await prisma_1.default.exam.findFirst({
        where: { id: examId, OR: [{ createdById: facultyId }, { facultyId }] },
        include: { attempts: { where: { status: "IN_PROGRESS" } } },
    });
    if (!exam)
        throw new Error("Exam not found or unauthorized");
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
    return { success: true, message: `Exam ${force ? "force-ended" : "ended"} successfully`, affectedStudents: exam.attempts.length };
}
async function flagStudentService(examId, facultyId, studentId, reason) {
    await getExamAuthCheck(examId, facultyId);
    const attempt = await prisma_1.default.examAttempt.findFirst({
        where: { examId, studentId, status: "IN_PROGRESS" },
    });
    if (!attempt)
        throw new Error("Student not found or not actively taking the exam");
    const [, violation] = await Promise.all([
        prisma_1.default.examAttempt.update({ where: { id: attempt.id }, data: { status: "FLAGGED" } }),
        prisma_1.default.examViolation.create({
            data: {
                examId,
                studentId,
                type: "SUSPICIOUS_ACTIVITY",
                severity: "HIGH",
                description: reason || "Manually flagged by faculty",
                details: `Student flagged by faculty member ID: ${facultyId}`,
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
        .notifyExamViolationEscalation(examId, studentId, 1, reason || "Manual faculty flag")
        .catch((error) => {
        console.error("Failed to send admin violation notification:", error);
    });
    return { success: true, message: "Student flagged successfully" };
}
async function unlockStudentService(examId, facultyId, studentId) {
    await getExamAuthCheck(examId, facultyId);
    const attempt = await prisma_1.default.examAttempt.findFirst({
        where: { examId, studentId, status: "FLAGGED" },
    });
    if (!attempt)
        throw new Error("Student not found or not flagged");
    await Promise.all([
        prisma_1.default.examAttempt.update({ where: { id: attempt.id }, data: { status: "IN_PROGRESS" } }),
        prisma_1.default.examViolation.updateMany({
            where: { examId, studentId, type: "SUSPICIOUS_ACTIVITY", resolved: false },
            data: { resolved: true, resolvedAt: new Date(), resolvedBy: `Faculty ${facultyId}` },
        }),
    ]);
    return { success: true, message: "Student unlocked successfully" };
}
async function notifyStudentService(examId, facultyId, studentId, message) {
    const exam = await getExamAuthCheck(examId, facultyId);
    const attempt = await prisma_1.default.examAttempt.findFirst({ where: { examId, studentId } });
    if (!attempt)
        throw new Error("Student not found in this exam");
    const notification = await notification_service_1.notificationService.createNotification(studentId, {
        type: notification_types_1.NotificationType.EXAM_NOTIFICATION,
        title: `Message from ${exam.title} faculty`,
        message,
        metadata: { examId, facultyId, timestamp: new Date() },
        priority: "MEDIUM",
    });
    if (!notification) {
        return {
            success: true,
            message: "Student has notifications disabled; message was not delivered",
        };
    }
    return { success: true, message: "Notification sent successfully" };
}
async function exportExamReportService(examId, facultyId) {
    const exam = await prisma_1.default.exam.findFirst({
        where: { id: examId, OR: [{ createdById: facultyId }, { facultyId }] },
        include: {
            subject: { select: { name: true, code: true } },
            section: { select: { name: true } },
            attempts: { include: { student: { select: { name: true, studentId: true } } } },
            violations: { where: { timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }, include: { student: { select: { name: true } } } },
            examQuestions: { select: { id: true } },
        },
    });
    if (!exam)
        throw new Error("Exam not found or unauthorized");
    return {
        exam: {
            id: exam.id,
            title: exam.title,
            subject: exam.subject.name,
            section: exam.section.name,
            status: exam.status,
            startsAt: exam.startsAt,
            endsAt: exam.endsAt,
            duration: exam.duration,
            totalQuestions: exam.examQuestions.length,
        },
        statistics: {
            totalStudents: exam.attempts.length,
            completedStudents: exam.attempts.filter((a) => ["COMPLETED", "SUBMITTED", "AUTO_SUBMITTED"].includes(a.status)).length,
            inProgressStudents: exam.attempts.filter((a) => a.status === "IN_PROGRESS").length,
            flaggedStudents: exam.attempts.filter((a) => a.status === "FLAGGED").length,
            averageScore: exam.attempts.length > 0 ? exam.attempts.reduce((sum, a) => sum + (a.score || 0), 0) / exam.attempts.length : 0,
            totalViolations: exam.violations.length,
            highSeverityViolations: exam.violations.filter((v) => v.severity === "HIGH").length,
            unresolvedViolations: exam.violations.filter((v) => !v.resolved).length,
        },
        violations: exam.violations.map((v) => ({
            studentName: v.student.name,
            type: v.type,
            severity: v.severity,
            timestamp: v.timestamp,
            description: v.description,
            resolved: v.resolved,
        })),
        students: exam.attempts.map((a) => ({
            name: a.student.name,
            studentNumber: a.student.studentId,
            status: a.status,
            score: a.score,
            startedAt: a.startedAt,
            submittedAt: a.submittedAt,
        })),
        rules: {
            violationThreshold: exam.violationThreshold,
            thresholdAction: exam.thresholdAction,
            securityFeatures: {
                detectTabSwitch: exam.detectTabSwitch,
                detectWindowBlur: exam.detectWindowBlur,
                detectDeviceChange: exam.detectDeviceChange,
            },
        },
        generatedAt: new Date().toISOString(),
        facultyId,
    };
}
