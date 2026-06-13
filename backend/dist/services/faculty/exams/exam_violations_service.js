"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamViolationsService = getExamViolationsService;
exports.getRecentViolationsService = getRecentViolationsService;
exports.markViolationResolvedService = markViolationResolvedService;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
async function getExamViolationsService(examId, facultyId, filters = {}) {
    const exam = await prisma_1.default.exam.findFirst({ where: { id: examId, OR: [{ createdById: facultyId }, { facultyId }] } });
    if (!exam)
        throw new Error("Exam not found or unauthorized");
    const whereClause = { examId, timestamp: { gte: filters.startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
    if (filters.endDate)
        whereClause.timestamp.lte = filters.endDate;
    if (filters.unresolved)
        whereClause.resolved = false;
    if (filters.severity?.length)
        whereClause.severity = { in: filters.severity };
    if (filters.type?.length)
        whereClause.type = { in: filters.type };
    const violations = await prisma_1.default.examViolation.findMany({
        where: whereClause,
        include: { student: { select: { name: true } } },
        orderBy: { timestamp: "desc" },
        take: filters.limit || 50,
    });
    return violations.map((v) => ({
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
    }));
}
async function getRecentViolationsService(facultyId, limit = 5) {
    const examIds = (await prisma_1.default.exam.findMany({
        where: { OR: [{ createdById: facultyId }, { facultyId }] },
        select: { id: true },
    })).map((e) => e.id);
    if (examIds.length === 0)
        return [];
    const violations = await prisma_1.default.examViolation.findMany({
        where: { examId: { in: examIds }, timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, resolved: false },
        include: { student: { select: { name: true } }, exam: { select: { title: true, subject: { select: { name: true } } } } },
        orderBy: { timestamp: "desc" },
        take: limit,
    });
    return violations.map((v) => ({
        id: v.id,
        examId: v.examId,
        studentId: v.studentId,
        studentName: v.student.name,
        examTitle: v.exam.title,
        subjectName: v.exam.subject.name,
        type: v.type,
        severity: v.severity,
        timestamp: v.timestamp.toISOString(),
        metadata: { description: v.description || "", details: v.details || "" },
        resolved: v.resolved,
    }));
}
async function markViolationResolvedService(violationId, facultyId, resolvedBy) {
    const violation = await prisma_1.default.examViolation.findFirst({
        where: { id: violationId },
        include: { exam: { select: { facultyId: true, createdById: true } } },
    });
    if (!violation || (violation.exam.facultyId !== facultyId && violation.exam.createdById !== facultyId)) {
        throw new Error("Violation not found or unauthorized");
    }
    return prisma_1.default.examViolation.update({
        where: { id: violationId },
        data: { resolved: true, resolvedAt: new Date(), resolvedBy },
    });
}
