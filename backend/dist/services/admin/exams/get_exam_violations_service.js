"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamViolationsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getExamViolationsService = async (examId) => {
    const exam = await prisma_1.default.exam.findUnique({
        where: { id: examId },
        include: {
            violations: {
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true,
                            studentId: true,
                        },
                    },
                },
                orderBy: {
                    timestamp: "desc",
                },
            },
            section: {
                select: {
                    id: true,
                    name: true,
                    sectionCode: true,
                },
            },
            subject: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    if (!exam) {
        throw new Error("Exam not found");
    }
    const typedExam = exam;
    // Group violations by severity
    const violationsBySeverity = {
        HIGH: typedExam.violations.filter((v) => v.severity === "HIGH"),
        MEDIUM: typedExam.violations.filter((v) => v.severity === "MEDIUM"),
        LOW: typedExam.violations.filter((v) => v.severity === "LOW"),
    };
    // Count resolved vs unresolved
    const resolved = typedExam.violations.filter((v) => v.resolved).length;
    const unresolved = typedExam.violations.filter((v) => !v.resolved).length;
    return {
        exam: {
            id: typedExam.id,
            title: typedExam.title,
            code: typedExam.examCode,
            section: typedExam.section
                ? {
                    id: typedExam.section.id,
                    name: typedExam.section.name,
                    code: typedExam.section.sectionCode,
                }
                : null,
            subject: {
                id: typedExam.subject.id,
                name: typedExam.subject.name,
            },
            status: typedExam.status,
            difficulty: typedExam.difficulty,
            startsAt: typedExam.startsAt,
            endsAt: typedExam.endsAt,
        },
        summary: {
            total: typedExam.violations.length,
            resolved,
            unresolved,
            bySeverity: {
                HIGH: violationsBySeverity.HIGH.length,
                MEDIUM: violationsBySeverity.MEDIUM.length,
                LOW: violationsBySeverity.LOW.length,
            },
        },
        violations: typedExam.violations.map((v) => ({
            id: v.id,
            student: v.student,
            type: v.type,
            severity: v.severity,
            timestamp: v.timestamp,
            description: v.description,
            details: v.details,
            resolved: v.resolved,
            resolvedAt: v.resolvedAt,
            resolvedBy: v.resolvedBy,
        })),
    };
};
exports.getExamViolationsService = getExamViolationsService;
