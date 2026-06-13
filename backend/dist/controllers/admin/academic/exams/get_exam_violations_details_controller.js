"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamViolationsDetailsController = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
/**
 * GET /api/admin/academic/exams/:examId/violations
 * Get violations for an exam with filtering and pagination
 */
const getExamViolationsDetailsController = async (req, res) => {
    try {
        const examIdParam = Array.isArray(req.params.examId)
            ? req.params.examId[0]
            : req.params.examId;
        const examId = parseInt(examIdParam, 10);
        if (isNaN(examId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid exam ID",
            });
        }
        // Get filters from query params
        const severity = req.query.severity;
        const resolved = req.query.resolved;
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 20);
        // Verify exam exists
        const exam = await prisma_1.default.exam.findUnique({
            where: { id: examId },
            select: {
                id: true,
                title: true,
                section: {
                    select: { id: true, name: true },
                },
            },
        });
        if (!exam) {
            return res.status(404).json({
                success: false,
                message: "Exam not found",
            });
        }
        // Build where clause for filtering
        const whereClause = { examId };
        if (severity && severity !== "ALL") {
            whereClause.severity = severity;
        }
        if (resolved !== undefined && resolved !== "ALL") {
            whereClause.resolved = resolved === "true";
        }
        // Get total violations for pagination
        const totalViolations = await prisma_1.default.examViolation.count({
            where: whereClause,
        });
        // Get violations with pagination
        const violations = await prisma_1.default.examViolation.findMany({
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
            orderBy: {
                timestamp: "desc",
            },
            skip: (page - 1) * limit,
            take: limit,
        });
        // Format violations
        const formattedViolations = violations.map((v) => ({
            id: v.id,
            studentName: v.student.name,
            studentId: v.student.studentId,
            type: v.type,
            severity: v.severity,
            timestamp: v.timestamp,
            description: v.description,
            details: v.details,
            resolved: v.resolved,
            resolvedAt: v.resolvedAt,
            resolvedBy: v.resolvedBy,
        }));
        // Calculate statistics
        const severityCounts = {
            LOW: violations.filter((v) => v.severity === "LOW").length,
            MEDIUM: violations.filter((v) => v.severity === "MEDIUM").length,
            HIGH: violations.filter((v) => v.severity === "HIGH").length,
        };
        const typeCounts = {};
        violations.forEach((v) => {
            typeCounts[v.type] = (typeCounts[v.type] || 0) + 1;
        });
        const stats = {
            totalViolations,
            resolved: violations.filter((v) => v.resolved).length,
            unresolved: violations.filter((v) => !v.resolved).length,
            severityCounts,
            typeCounts,
        };
        const totalPages = Math.ceil(totalViolations / limit);
        return res.status(200).json({
            success: true,
            data: {
                exam: exam,
                violations: formattedViolations,
                stats,
                pagination: {
                    page,
                    limit,
                    total: totalViolations,
                    totalPages,
                },
            },
        });
    }
    catch (error) {
        console.error("Error fetching exam violations:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch exam violations",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getExamViolationsDetailsController = getExamViolationsDetailsController;
