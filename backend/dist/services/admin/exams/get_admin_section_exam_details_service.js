"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminSectionExamDetailsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getAdminSectionExamDetailsService = async (sectionId) => {
    const section = await prisma_1.default.section.findUnique({
        where: {
            id: sectionId,
            isArchived: false,
        },
        include: {
            users: {
                where: {
                    role: "STUDENT",
                },
            },
            exams: {
                where: {
                    isArchived: false,
                },
                include: {
                    attempts: true,
                    violations: true,
                    subject: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });
    if (!section) {
        throw new Error(`Section with ID ${sectionId} not found`);
    }
    // Calculate stats
    const totalStudents = section.users.length;
    const allExamViolations = section.exams.flatMap((e) => e.violations);
    const violationCounts = {
        total: allExamViolations.length,
        unresolved: allExamViolations.filter((v) => !v.resolved).length,
        resolved: allExamViolations.filter((v) => v.resolved).length,
        bySeverity: {
            LOW: allExamViolations.filter((v) => v.severity === "LOW").length,
            MEDIUM: allExamViolations.filter((v) => v.severity === "MEDIUM")
                .length,
            HIGH: allExamViolations.filter((v) => v.severity === "HIGH")
                .length,
        },
    };
    // Find ongoing exams
    const now = new Date();
    const ongoingExams = section.exams.filter((exam) => {
        const startsAt = exam.startsAt ? new Date(exam.startsAt) : null;
        const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;
        if (!startsAt || !endsAt)
            return false;
        return startsAt <= now && now <= endsAt;
    });
    const activeStudents = new Set(ongoingExams.flatMap((e) => e.attempts
        .filter((a) => a.status === "IN_PROGRESS")
        .map((a) => a.studentId))).size;
    return {
        id: section.id,
        name: section.name,
        code: section.sectionCode,
        program: section.program,
        yearLevel: section.yearLevel,
        totalStudents,
        activeStudents,
        exams: section.exams.map((exam) => ({
            id: exam.id,
            title: exam.title,
            code: exam.examCode,
            subject: exam.subject.name,
            status: exam.status,
            difficulty: exam.difficulty,
            startsAt: exam.startsAt,
            endsAt: exam.endsAt,
            totalQuestions: exam.totalQuestions,
            totalAttempts: exam.attempts.length,
            totalViolations: exam.violations.length,
            unresolvedViolations: exam.violations.filter((v) => !v.resolved)
                .length,
        })),
        violations: violationCounts,
    };
};
exports.getAdminSectionExamDetailsService = getAdminSectionExamDetailsService;
