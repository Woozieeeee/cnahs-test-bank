"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSectionExamsController = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
/**
 * GET /api/admin/academic/sections/:sectionId/exams
 * Get all exams in a section with statistics
 */
const getSectionExamsController = async (req, res) => {
    try {
        const sectionIdParam = Array.isArray(req.params.sectionId)
            ? req.params.sectionId[0]
            : req.params.sectionId;
        const sectionId = parseInt(sectionIdParam, 10);
        if (isNaN(sectionId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid section ID",
            });
        }
        // Verify section exists
        const section = await prisma_1.default.section.findUnique({
            where: { id: sectionId },
            select: { id: true, name: true },
        });
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }
        // Get all exams in this section
        const exams = await prisma_1.default.exam.findMany({
            where: {
                sectionId,
                isArchived: false,
            },
            select: {
                id: true,
                title: true,
                description: true,
                difficulty: true,
                duration: true,
                totalQuestions: true,
                status: true,
                startsAt: true,
                endsAt: true,
                createdAt: true,
                passingScore: true,
                attempts: {
                    select: {
                        id: true,
                        score: true,
                        status: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        // Calculate statistics for each exam
        const examsWithStats = exams.map((exam) => {
            const totalAttempts = exam.attempts.length;
            const completedAttempts = exam.attempts.filter((a) => a.status === "COMPLETED" || a.status === "SUBMITTED").length;
            const passedAttempts = exam.attempts.filter((a) => a.score >= exam.passingScore).length;
            const averageScore = totalAttempts > 0
                ? Math.round(exam.attempts.reduce((sum, a) => sum + a.score, 0) /
                    totalAttempts)
                : 0;
            return {
                id: exam.id,
                title: exam.title,
                description: exam.description,
                difficulty: exam.difficulty,
                duration: exam.duration,
                totalQuestions: exam.totalQuestions,
                status: exam.status,
                startsAt: exam.startsAt,
                endsAt: exam.endsAt,
                createdAt: exam.createdAt.toISOString(),
                passingScore: exam.passingScore,
                totalAttempts,
                completedAttempts,
                passedAttempts,
                averageScore,
                passRate: totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0,
            };
        });
        // Calculate section-level statistics
        const allAttempts = exams.flatMap((e) => e.attempts);
        const sectionStats = {
            totalExams: exams.length,
            totalAttempts: allAttempts.length,
            averageScore: allAttempts.length > 0
                ? Math.round(allAttempts.reduce((sum, a) => sum + a.score, 0) /
                    allAttempts.length)
                : 0,
            overallPassRate: allAttempts.length > 0
                ? Math.round((allAttempts.filter((a) => a.score >= 75).length /
                    allAttempts.length) *
                    100)
                : 0,
        };
        return res.status(200).json({
            success: true,
            data: {
                section: {
                    id: section.id,
                    name: section.name,
                },
                exams: examsWithStats,
                stats: sectionStats,
            },
        });
    }
    catch (error) {
        console.error("Error fetching section exams:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch section exams",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getSectionExamsController = getSectionExamsController;
