"use strict";
/**
 * PHASE 2: FACULTY NOTIFICATION HANDLER
 * Manages notifications for faculty including:
 * - Exam creation, publishing, and session management
 * - Student submissions and performance tracking
 * - Exam violations and academic integrity concerns
 * - Question imports and resource management
 * - Class performance analytics and alerts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyNotificationHandler = exports.FacultyNotificationHandler = void 0;
const client_1 = require("@prisma/client");
const notification_service_1 = require("./notification_service");
const notification_types_1 = require("./notification_types");
const notification_templates_1 = require("./notification_templates");
const prisma = new client_1.PrismaClient();
class FacultyNotificationHandler {
    /**
     * Notify faculty when exam is created
     */
    async notifyExamCreated(examId) {
        const exam = await prisma.exam.findUnique({
            where: { id: examId },
            include: {
                createdBy: true,
                section: true,
            },
        });
        if (!exam || !exam.createdBy)
            return;
        const template = notification_templates_1.FacultyNotificationTemplates.EXAM_CREATED;
        const message = template.messageTemplate({
            examTitle: exam.title,
            sectionName: exam.section?.name || "Unknown Section",
        });
        await notification_service_1.notificationService.createNotification(exam.createdBy.id, {
            type: notification_types_1.NotificationType.EXAM_CREATED,
            title: template.title,
            message,
            metadata: {
                examId,
                sectionId: exam.sectionId,
                actionUrl: `/faculty/exams/${examId}/edit`,
            },
            priority: "MEDIUM",
        });
    }
    /**
     * Notify faculty when exam is published
     */
    async notifyExamPublished(examId) {
        const exam = await prisma.exam.findUnique({
            where: { id: examId },
            include: {
                createdBy: true,
                section: true,
            },
        });
        if (!exam || !exam.createdBy)
            return;
        // Count students in the section
        const studentCount = await prisma.user.count({
            where: {
                sectionId: exam.sectionId,
                role: "STUDENT",
            },
        });
        const template = notification_templates_1.FacultyNotificationTemplates.EXAM_PUBLISHED;
        const message = template.messageTemplate({
            examTitle: exam.title,
            studentCount,
            sectionName: exam.section?.name || "Unknown Section",
        });
        await notification_service_1.notificationService.createNotification(exam.createdBy.id, {
            type: notification_types_1.NotificationType.EXAM_PUBLISHED,
            title: template.title,
            message,
            metadata: {
                examId,
                studentCount,
                actionUrl: `/faculty/exams/${examId}/monitor`,
            },
            priority: "HIGH",
        });
    }
    /**
     * Notify faculty when exam session starts
     */
    async notifyExamSessionStarted(examId) {
        const exam = await prisma.exam.findUnique({
            where: { id: examId },
            include: { createdBy: true },
        });
        if (!exam || !exam.createdBy)
            return;
        // Count active attempts
        const activeAttempts = await prisma.examAttempt.count({
            where: {
                examId,
                status: "IN_PROGRESS",
            },
        });
        const template = notification_templates_1.FacultyNotificationTemplates.EXAM_STARTED;
        const message = template.messageTemplate({
            examTitle: exam.title,
            activeStudents: activeAttempts,
        });
        await notification_service_1.notificationService.createNotification(exam.createdBy.id, {
            type: notification_types_1.NotificationType.EXAM_STARTED,
            title: template.title,
            message,
            metadata: {
                examId,
                activeStudents: activeAttempts,
                actionUrl: `/faculty/exams/${examId}/monitor`,
            },
            priority: "HIGH",
        });
    }
    /**
     * Notify faculty when exam session ends
     */
    async notifyExamSessionCompleted(examId) {
        const exam = await prisma.exam.findUnique({
            where: { id: examId },
            include: { createdBy: true, section: true },
        });
        if (!exam || !exam.createdBy)
            return;
        // Get submission stats
        const totalStudents = await prisma.user.count({
            where: {
                sectionId: exam.sectionId,
                role: "STUDENT",
            },
        });
        const submittedAttempts = await prisma.examAttempt.findMany({
            where: {
                examId,
                status: "COMPLETED",
            },
            select: { score: true },
        });
        const submittedCount = submittedAttempts.length;
        const averageScore = submittedCount > 0
            ? Math.round((submittedAttempts.reduce((sum, a) => sum + a.score, 0) /
                submittedCount) *
                100)
            : 0;
        const template = notification_templates_1.FacultyNotificationTemplates.EXAM_COMPLETED_FACULTY;
        const message = template.messageTemplate({
            examTitle: exam.title,
            submittedCount,
            totalStudents,
            averageScore,
        });
        await notification_service_1.notificationService.createNotification(exam.createdBy.id, {
            type: notification_types_1.NotificationType.EXAM_COMPLETED_FACULTY,
            title: template.title,
            message,
            metadata: {
                examId,
                submittedCount,
                totalStudents,
                averageScore,
                actionUrl: `/faculty/exams/${examId}/results`,
            },
            priority: "HIGH",
        });
    }
    /**
     * Notify faculty when student submits exam
     */
    async notifyStudentSubmissionReceived(attemptId) {
        const attempt = await prisma.examAttempt.findUnique({
            where: { id: attemptId },
            include: {
                exam: { include: { createdBy: true } },
                student: true,
            },
        });
        if (!attempt || !attempt.exam.createdBy)
            return;
        const percentage = Math.round(((attempt.score / attempt.exam.totalQuestions) * 100));
        const template = notification_templates_1.FacultyNotificationTemplates.STUDENT_SUBMISSION_RECEIVED;
        const message = template.messageTemplate({
            studentName: attempt.student.name,
            examTitle: attempt.exam.title,
            score: attempt.score,
            totalScore: attempt.exam.totalQuestions,
            status: attempt.status,
        });
        await notification_service_1.notificationService.createNotification(attempt.exam.createdBy.id, {
            type: notification_types_1.NotificationType.STUDENT_SUBMISSION_RECEIVED,
            title: template.title,
            message,
            metadata: {
                examId: attempt.exam.id,
                studentId: attempt.student.id,
                score: attempt.score,
                percentage,
                actionUrl: `/faculty/exams/${attempt.exam.id}/submissions/${attempt.id}`,
            },
            priority: "MEDIUM",
        });
    }
    /**
     * Notify faculty when exam violation is detected
     */
    async notifyViolationDetected(violationId) {
        const violation = await prisma.examViolation.findUnique({
            where: { id: violationId },
            include: {
                exam: { include: { createdBy: true } },
                student: true,
            },
        });
        if (!violation?.exam.createdBy)
            return;
        const template = notification_templates_1.FacultyNotificationTemplates.VIOLATION_DETECTED;
        const message = template.messageTemplate({
            examTitle: violation.exam.title,
            studentName: violation.student.name,
            violationType: violation.type,
            severity: violation.severity || "MEDIUM",
        });
        const payload = {
            type: notification_types_1.NotificationType.VIOLATION_DETECTED,
            title: template.title,
            message,
            metadata: {
                examId: violation.exam.id,
                studentId: violation.student.id,
                violationType: violation.type,
                severity: violation.severity ||
                    "MEDIUM",
                description: violation.description,
                actionUrl: `/faculty/exams/${violation.exam.id}/violations/${violation.id}`,
            },
            priority: "HIGH",
        };
        const recipientIds = new Set([
            violation.exam.createdBy.id,
            violation.exam.facultyId,
        ]);
        await Promise.all([...recipientIds].map((userId) => notification_service_1.notificationService.createNotification(userId, payload)));
    }
    /**
     * Notify faculty when question batch is imported
     */
    async notifyQuestionBatchImported(importJobId, facultyId) {
        const importJob = await prisma.importJob.findUnique({
            where: { id: importJobId },
            include: {
                topic: true,
                batches: true,
            },
        });
        if (!importJob)
            return;
        const importedCount = importJob.importedRows;
        const skippedCount = importJob.skippedRows;
        const template = notification_templates_1.FacultyNotificationTemplates.QUESTION_BATCH_IMPORTED;
        const message = template.messageTemplate({
            importedCount,
            topicName: importJob.topic?.name || "Unknown Topic",
            skippedCount,
        });
        await notification_service_1.notificationService.createNotification(facultyId, {
            type: notification_types_1.NotificationType.QUESTION_BATCH_IMPORTED,
            title: template.title,
            message,
            metadata: {
                importJobId,
                importedCount,
                skippedCount,
                totalRecords: importJob.totalRows,
                topicId: importJob.topicId,
                actionUrl: `/faculty/questions/import/${importJobId}`,
            },
            priority: "MEDIUM",
        });
    }
    /**
     * Notify faculty about exam performance summary
     */
    async notifyExamPerformanceSummary(examId) {
        const exam = await prisma.exam.findUnique({
            where: { id: examId },
            include: { createdBy: true },
        });
        if (!exam || !exam.createdBy)
            return;
        // Calculate performance metrics
        const attempts = await prisma.examAttempt.findMany({
            where: { examId, status: "COMPLETED" },
            select: { score: true },
        });
        if (attempts.length === 0)
            return;
        const scores = attempts.map((a) => (a.score / exam.totalQuestions) * 100);
        const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        const passRate = Math.round((scores.filter((s) => s >= exam.passingScore).length / scores.length) *
            100);
        const highestScore = Math.round(Math.max(...scores));
        const lowestScore = Math.round(Math.min(...scores));
        const template = notification_templates_1.FacultyNotificationTemplates.EXAM_PERFORMANCE_SUMMARY;
        const message = template.messageTemplate({
            examTitle: exam.title,
            averageScore,
            passRate,
            highestScore,
            lowestScore,
        });
        await notification_service_1.notificationService.createNotification(exam.createdBy.id, {
            type: notification_types_1.NotificationType.EXAM_PERFORMANCE_SUMMARY,
            title: template.title,
            message,
            metadata: {
                examId,
                averageScore,
                passRate,
                highestScore,
                lowestScore,
                totalAttempts: attempts.length,
                actionUrl: `/faculty/exams/${examId}/analytics`,
            },
            priority: "MEDIUM",
        });
    }
    /**
     * Notify faculty about pending question import
     */
    async notifyQuestionImportPending(importJobId, facultyId) {
        const importJob = await prisma.importJob.findUnique({
            where: { id: importJobId },
            include: { topic: true },
        });
        if (!importJob)
            return;
        const template = notification_templates_1.FacultyNotificationTemplates.NEW_QUESTION_IMPORT_REQUEST;
        const message = template.messageTemplate({
            topicName: importJob.topic?.name || "Unknown Topic",
            questionCount: importJob.totalRows,
        });
        await notification_service_1.notificationService.createNotification(facultyId, {
            type: notification_types_1.NotificationType.NEW_QUESTION_IMPORT_REQUEST,
            title: template.title,
            message,
            metadata: {
                importJobId,
                questionCount: importJob.totalRows,
                topicId: importJob.topicId,
                actionUrl: `/faculty/questions/import/${importJobId}/review`,
            },
            priority: "MEDIUM",
        });
    }
    /**
     * Alert faculty about student low performance
     */
    async notifyStudentPerformanceAlert(studentId, examId) {
        const attempt = await prisma.examAttempt.findFirst({
            where: { examId, studentId },
            include: {
                exam: { include: { createdBy: true } },
                student: true,
            },
        });
        if (!attempt || !attempt.exam.createdBy)
            return;
        const percentage = Math.round(((attempt.score / attempt.exam.totalQuestions) * 100));
        // Alert only if score is below 60%
        if (percentage < 60) {
            const template = notification_templates_1.FacultyNotificationTemplates.STUDENT_PERFORMANCE_ALERT;
            const message = template.messageTemplate({
                studentName: attempt.student.name,
                examTitle: attempt.exam.title,
            });
            await notification_service_1.notificationService.createNotification(attempt.exam.createdBy.id, {
                type: notification_types_1.NotificationType.STUDENT_PERFORMANCE_ALERT,
                title: template.title,
                message,
                metadata: {
                    examId,
                    studentId,
                    score: attempt.score,
                    percentage,
                    actionUrl: `/faculty/students/${studentId}/performance`,
                },
                priority: "MEDIUM",
            });
        }
    }
}
exports.FacultyNotificationHandler = FacultyNotificationHandler;
exports.facultyNotificationHandler = new FacultyNotificationHandler();
