"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionBankController = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
/**
 * GET /api/admin/academic/sections/:sectionId/questions
 * Get question bank for a section with filtering and analytics
 */
const getQuestionBankController = async (req, res) => {
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
        // Get filters from query params
        const topic = req.query.topic;
        const search = req.query.search;
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 20);
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
        // Get all questions for exams in this section
        const questions = await prisma_1.default.question.findMany({
            where: {
                examQuestions: {
                    some: {
                        exam: {
                            sectionId,
                        },
                    },
                },
                isArchived: false,
            },
            include: {
                topic: {
                    select: {
                        name: true,
                    },
                },
                studentAnswers: {
                    select: {
                        isCorrect: true,
                    },
                },
            },
        });
        // Calculate success rate for each question
        const questionsWithStats = questions.map((q) => {
            const totalAnswers = q.studentAnswers.length;
            const correctAnswers = q.studentAnswers.filter((a) => a.isCorrect).length;
            const successRate = totalAnswers > 0
                ? Math.round((correctAnswers / totalAnswers) * 100)
                : 0;
            return {
                id: q.id,
                question: q.question,
                topic: q.topic.name,
                difficulty: q.difficulty,
                totalAttempts: totalAnswers,
                successRate,
                passCount: correctAnswers,
            };
        });
        // Apply filters
        let filtered = questionsWithStats;
        if (topic) {
            filtered = filtered.filter((q) => q.topic.toLowerCase().includes(topic.toLowerCase()));
        }
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter((q) => q.question.toLowerCase().includes(searchLower) ||
                q.topic.toLowerCase().includes(searchLower));
        }
        // Calculate analytics
        const totalQuestions = filtered.length;
        const topics = Array.from(new Set(filtered.map((q) => q.topic)));
        // Group by topic
        const byTopic = topics.map((t) => {
            const topicQuestions = filtered.filter((q) => q.topic === t);
            const avgSuccessRate = Math.round(topicQuestions.reduce((sum, q) => sum + q.successRate, 0) /
                topicQuestions.length);
            return {
                topic: t,
                count: topicQuestions.length,
                averageSuccessRate: avgSuccessRate,
            };
        });
        // Find weakest questions (lowest success rate)
        const weakestQuestions = [...filtered]
            .sort((a, b) => a.successRate - b.successRate)
            .slice(0, 5)
            .map((q) => ({
            id: q.id,
            question: q.question,
            successRate: q.successRate,
            attempts: q.totalAttempts,
        }));
        const averageSuccessRate = Math.round(filtered.reduce((sum, q) => sum + q.successRate, 0) /
            (filtered.length || 1));
        // Paginate results
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedQuestions = filtered.slice(startIndex, endIndex);
        const totalPages = Math.ceil(filtered.length / limit);
        return res.status(200).json({
            success: true,
            data: {
                section: {
                    id: section.id,
                    name: section.name,
                },
                questions: paginatedQuestions,
                analytics: {
                    totalQuestions,
                    totalTopics: topics.length,
                    byTopic,
                    averageSuccessRate,
                    weakestQuestions,
                },
                pagination: {
                    page,
                    limit,
                    total: filtered.length,
                    totalPages,
                },
            },
        });
    }
    catch (error) {
        console.error("Error fetching question bank:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch question bank",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getQuestionBankController = getQuestionBankController;
