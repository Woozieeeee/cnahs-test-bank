"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminExamsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getAdminExamsService = async (filter) => {
    // Get all exams with basic data + monitoring data
    console.time("PRISMA_ADMIN_EXAMS");
    const exams = await prisma_1.default.exam.findMany({
        include: {
            subject: {
                select: {
                    id: true,
                    name: true,
                    code: true,
                },
            },
            section: {
                select: {
                    id: true,
                    name: true,
                },
            },
            _count: {
                select: {
                    examQuestions: true,
                },
            },
            attempts: {
                select: {
                    id: true,
                    studentId: true,
                    status: true,
                    startedAt: true,
                    score: true,
                },
            },
            violations: {
                where: { timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
                select: {
                    id: true,
                    examId: true,
                    studentId: true,
                    type: true,
                    severity: true,
                    timestamp: true,
                    description: true,
                    details: true,
                    resolved: true,
                    resolvedAt: true,
                    resolvedBy: true,
                    student: { select: { name: true } },
                },
                orderBy: { timestamp: "desc" },
                take: 5,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 100,
    });
    const examsData = exams.map((exam) => {
        const activeAttempts = exam.attempts.filter((a) => a.status === "IN_PROGRESS");
        const completedAttempts = exam.attempts.filter((a) => ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"].includes(a.status));
        const flaggedAttempts = exam.attempts.filter((a) => a.status === "FLAGGED");
        const totalStudents = exam.attempts.length;
        const progressPercentage = totalStudents > 0 ? Math.round((completedAttempts.length / totalStudents) * 100) : 0;
        const now = new Date();
        const startsAt = exam.startsAt ? new Date(exam.startsAt) : null;
        const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;
        const timeRemainingMinutes = endsAt && now < endsAt ? Math.max(0, Math.round((endsAt.getTime() - now.getTime()) / (60 * 1000))) : 0;
        const estimatedEndTime = endsAt?.toISOString() || new Date().toISOString();
        const violationCount = exam.violations.length;
        let riskLevel = violationCount >= 10 ? "HIGH" : violationCount >= 3 ? "MEDIUM" : "LOW";
        if (flaggedAttempts.length > totalStudents * 0.3)
            riskLevel = "HIGH";
        const lastActivityAt = activeAttempts.length > 0
            ? new Date(Math.max(...activeAttempts.map((a) => a.startedAt?.getTime() || 0))).toISOString()
            : exam.updatedAt.toISOString();
        return {
            id: exam.id,
            title: exam.title,
            status: exam.status,
            subjectId: exam.subject.id,
            subjectName: exam.subject.name,
            subjectCode: exam.subject.code,
            sectionId: exam.section.id,
            sectionName: exam.section.name,
            totalQuestions: exam._count.examQuestions,
            totalAttempts: exam.attempts.length,
            duration: exam.duration,
            startsAt: exam.startsAt?.toISOString() || null,
            endsAt: exam.endsAt?.toISOString() || null,
            createdAt: exam.createdAt.toISOString(),
            // Monitoring data
            activeStudents: activeAttempts.length,
            totalStudents,
            completedStudents: completedAttempts.length,
            pendingStudents: totalStudents - activeAttempts.length - completedAttempts.length,
            flaggedStudents: flaggedAttempts.length,
            violations: {
                count: violationCount,
                recent: exam.violations.map((v) => ({
                    id: v.id,
                    examId: v.examId,
                    studentId: v.studentId,
                    studentName: v.student.name,
                    type: v.type,
                    severity: v.severity,
                    timestamp: v.timestamp.toISOString(),
                    metadata: { description: v.description || "", details: v.details || "" },
                    resolved: v.resolved,
                    resolvedAt: v.resolvedAt?.toISOString(),
                    resolvedBy: v.resolvedBy || undefined,
                })),
            },
            progressPercentage,
            lastActivityAt,
            riskLevel,
            timeRemainingMinutes,
            estimatedEndTime,
        };
    });
    // Apply filters
    let filtered = examsData;
    if (filter?.status?.length)
        filtered = filtered.filter((e) => filter.status.includes(e.status));
    if (filter?.subjectId)
        filtered = filtered.filter((e) => e.subjectId === filter.subjectId);
    if (filter?.search) {
        const q = filter.search.toLowerCase();
        filtered = filtered.filter((e) => e.title.toLowerCase().includes(q) ||
            e.subjectName.toLowerCase().includes(q) ||
            e.sectionName.toLowerCase().includes(q));
    }
    console.timeEnd("PRISMA_ADMIN_EXAMS");
    return filtered;
};
exports.getAdminExamsService = getAdminExamsService;
