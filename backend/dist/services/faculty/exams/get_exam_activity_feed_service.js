"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamActivityFeedService = getExamActivityFeedService;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
async function getExamActivityFeedService(examId, facultyId, filters = {}) {
    // Verify exam belongs to faculty
    const exam = await prisma_1.default.exam.findFirst({
        where: {
            id: examId,
            OR: [
                { createdById: facultyId },
                { facultyId },
                {
                    section: {
                        sectionSubjects: {
                            some: {
                                facultyId,
                            },
                        },
                    },
                },
            ],
        },
    });
    if (!exam) {
        throw new Error("Exam not found or unauthorized");
    }
    const whereClause = {
        examId,
        timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    };
    if (filters.studentId) {
        whereClause.studentId = filters.studentId;
    }
    if (filters.type?.length) {
        whereClause.type = { in: filters.type };
    }
    if (filters.severity?.length) {
        whereClause.severity = { in: filters.severity };
    }
    const [violations, total] = await Promise.all([
        prisma_1.default.examViolation.findMany({
            where: whereClause,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        studentId: true,
                    },
                },
            },
            orderBy: { timestamp: "desc" },
            take: filters.limit || 50,
            skip: filters.offset || 0,
        }),
        prisma_1.default.examViolation.count({ where: whereClause }),
    ]);
    const activities = violations.map((v) => ({
        id: v.id,
        timestamp: v.timestamp.toISOString(),
        studentName: v.student.name,
        studentNumber: v.student.studentId,
        studentId: v.student.id,
        action: getViolationActionText(v.type),
        type: v.type,
        severity: mapSeverityToLevel(v.severity),
        isViolation: true,
        resolved: v.resolved,
        description: v.description,
        details: v.details,
    }));
    return {
        activities,
        pagination: {
            total,
            limit: filters.limit || 50,
            offset: filters.offset || 0,
            hasMore: (filters.offset || 0) + (filters.limit || 50) < total,
        },
    };
}
function getViolationActionText(violationType) {
    const violationMap = {
        TAB_SWITCH: "switched tabs",
        WINDOW_BLUR: "window blur detected",
        DEVICE_CHANGE: "device change detected",
        MULTIPLE_FACES: "multiple faces detected",
        NO_FACE: "no face detected",
        SUSPICIOUS_ACTIVITY: "suspicious activity detected",
    };
    return violationMap[violationType] || "violation detected";
}
function mapSeverityToLevel(severity) {
    const severityMap = {
        LOW: "INFO",
        MEDIUM: "WARNING",
        HIGH: "ERROR",
    };
    return severityMap[severity] || "INFO";
}
