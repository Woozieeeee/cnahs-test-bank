"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordLiveExamViolation = recordLiveExamViolation;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const violations_1 = require("../../lib/constants/activity/violations");
const record_exam_violation_service_1 = require("../activity/record_exam_violation_service");
const faculty_notification_handler_1 = require("../notification/faculty_notification_handler");
const student_notification_handler_1 = require("../notification/student_notification_handler");
const admin_notification_handler_1 = require("../notification/admin_notification_handler");
const DEDUPE_WINDOW_MS = 30000;
const VALID_VIOLATION_TYPES = new Set(violations_1.EXAM_VIOLATIONS);
const FRONTEND_SEVERITY_TO_DB = {
    WARNING: "MEDIUM",
    CRITICAL: "HIGH",
};
function normalizeViolationType(type) {
    const normalized = type.toUpperCase();
    if (VALID_VIOLATION_TYPES.has(normalized)) {
        return normalized;
    }
    return "SUSPICIOUS_ACTIVITY";
}
function mapSeverity(severity) {
    if (!severity)
        return "MEDIUM";
    return FRONTEND_SEVERITY_TO_DB[severity.toUpperCase()] ?? "MEDIUM";
}
async function ensureActiveAttempt(examId, studentId) {
    const completedAttempt = await prisma_1.default.examAttempt.findFirst({
        where: {
            examId,
            studentId,
            status: { in: ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"] },
        },
    });
    if (completedAttempt) {
        throw new Error("Exam already submitted");
    }
    const existingAttempt = await prisma_1.default.examAttempt.findFirst({
        where: { examId, studentId },
        orderBy: { startedAt: "desc" },
    });
    if (existingAttempt) {
        return existingAttempt;
    }
    return prisma_1.default.examAttempt.create({
        data: {
            examId,
            studentId,
            startedAt: new Date(),
            status: "IN_PROGRESS",
        },
    });
}
async function recordLiveExamViolation(input) {
    const exam = await prisma_1.default.exam.findUnique({
        where: { id: input.examId },
        select: {
            id: true,
            violationThreshold: true,
            thresholdAction: true,
        },
    });
    if (!exam) {
        throw new Error("Exam not found");
    }
    await ensureActiveAttempt(input.examId, input.studentId);
    const violationType = normalizeViolationType(input.type);
    const dbSeverity = mapSeverity(input.severity);
    const dedupeSince = new Date(Date.now() - DEDUPE_WINDOW_MS);
    const recentDuplicate = await prisma_1.default.examViolation.findFirst({
        where: {
            examId: input.examId,
            studentId: input.studentId,
            type: violationType,
            timestamp: { gte: dedupeSince },
        },
        orderBy: { timestamp: "desc" },
    });
    if (recentDuplicate) {
        const violationCount = await prisma_1.default.examViolation.count({
            where: { examId: input.examId, studentId: input.studentId },
        });
        return {
            violationId: recentDuplicate.id,
            deduplicated: true,
            flagged: false,
            autoSubmitted: false,
            violationCount,
            thresholdCrossed: false,
        };
    }
    const violation = await prisma_1.default.examViolation.create({
        data: {
            examId: input.examId,
            studentId: input.studentId,
            type: violationType,
            severity: dbSeverity,
            description: input.description ?? null,
            details: input.metadata ? JSON.stringify(input.metadata) : null,
            resolved: false,
            timestamp: new Date(),
        },
    });
    void (0, record_exam_violation_service_1.recordExamViolation)({
        violation: violationType,
        studentName: input.studentName,
        metadata: {
            examId: input.examId,
            violationId: violation.id,
            ...input.metadata,
        },
    }).catch((error) => {
        console.error("Failed to log exam violation activity:", error);
    });
    void faculty_notification_handler_1.facultyNotificationHandler
        .notifyViolationDetected(violation.id)
        .catch((error) => {
        console.error("Failed to send faculty violation notification:", error);
    });
    const violationCount = await prisma_1.default.examViolation.count({
        where: { examId: input.examId, studentId: input.studentId },
    });
    let flagged = false;
    let autoSubmitted = false;
    const thresholdCrossed = violationCount === exam.violationThreshold;
    if (thresholdCrossed) {
        const attempt = await prisma_1.default.examAttempt.findFirst({
            where: {
                examId: input.examId,
                studentId: input.studentId,
                status: { in: ["IN_PROGRESS", "FLAGGED"] },
            },
            orderBy: { startedAt: "desc" },
        });
        if (attempt?.status === "IN_PROGRESS") {
            if (exam.thresholdAction === "FLAG_REVIEW") {
                await prisma_1.default.examAttempt.update({
                    where: { id: attempt.id },
                    data: { status: "FLAGGED" },
                });
                flagged = true;
                void student_notification_handler_1.studentNotificationHandler
                    .notifyExamFlagged(violation.id)
                    .catch((error) => {
                    console.error("Failed to send student flag notification:", error);
                });
            }
            else if (exam.thresholdAction === "AUTO_SUBMIT") {
                await prisma_1.default.examAttempt.update({
                    where: { id: attempt.id },
                    data: {
                        status: "AUTO_SUBMITTED",
                        submittedAt: new Date(),
                    },
                });
                autoSubmitted = true;
                void faculty_notification_handler_1.facultyNotificationHandler
                    .notifyStudentSubmissionReceived(attempt.id)
                    .catch((error) => {
                    console.error("Failed to send faculty auto-submit notification:", error);
                });
            }
            else if (exam.thresholdAction === "END_EXAM") {
                await prisma_1.default.examAttempt.update({
                    where: { id: attempt.id },
                    data: { status: "FLAGGED" },
                });
                flagged = true;
            }
        }
        void admin_notification_handler_1.adminNotificationHandler
            .notifyExamViolationEscalation(input.examId, input.studentId, violationCount, autoSubmitted
            ? `Violation threshold (${exam.violationThreshold}) reached — exam auto-submitted`
            : flagged
                ? `Violation threshold (${exam.violationThreshold}) reached — attempt flagged`
                : `Violation threshold (${exam.violationThreshold}) reached`)
            .catch((error) => {
            console.error("Failed to send admin violation escalation:", error);
        });
    }
    else if (dbSeverity === "HIGH") {
        void admin_notification_handler_1.adminNotificationHandler
            .notifyExamViolationEscalation(input.examId, input.studentId, violationCount, `High-severity violation: ${violationType}`)
            .catch((error) => {
            console.error("Failed to send admin high-severity escalation:", error);
        });
    }
    return {
        violationId: violation.id,
        deduplicated: false,
        flagged,
        autoSubmitted,
        violationCount,
        thresholdCrossed,
        thresholdAction: thresholdCrossed ? exam.thresholdAction : undefined,
    };
}
