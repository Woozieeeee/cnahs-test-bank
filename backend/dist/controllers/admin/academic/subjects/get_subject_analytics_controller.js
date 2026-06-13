"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectAnalyticsController = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
/**
 * GET /api/admin/academic/subjects/:subjectId/analytics
 * Get comprehensive analytics for a subject
 */
const getSubjectAnalyticsController = async (req, res) => {
    try {
        const subjectIdParam = Array.isArray(req.params.subjectId)
            ? req.params.subjectId[0]
            : req.params.subjectId;
        const subjectId = parseInt(subjectIdParam, 10);
        if (isNaN(subjectId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid subject ID",
            });
        }
        // Fetch subject with related data
        const subject = await prisma_1.default.subject.findUnique({
            where: { id: subjectId },
            include: {
                sectionSubjects: {
                    include: {
                        section: {
                            select: {
                                id: true,
                                name: true,
                                yearLevel: true,
                                program: true,
                            },
                        },
                        faculty: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                exams: {
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        attempts: {
                            select: {
                                score: true,
                            },
                        },
                    },
                },
                questions: {
                    where: { isArchived: false },
                    include: {
                        studentAnswers: {
                            select: {
                                isCorrect: true,
                            },
                        },
                    },
                },
            },
        });
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found",
            });
        }
        // Calculate overview statistics
        const totalSections = subject.sectionSubjects.length;
        const totalExams = subject.exams.length;
        const totalQuestions = subject.questions.length;
        // Calculate performance metrics across all exams
        const allExamAttempts = subject.exams.flatMap((exam) => exam.attempts);
        const totalAttempts = allExamAttempts.length;
        const averageScore = totalAttempts > 0
            ? Math.round(allExamAttempts.reduce((sum, a) => sum + a.score, 0) /
                totalAttempts)
            : 0;
        const passedAttempts = allExamAttempts.filter((a) => a.score >= 75).length;
        const passingRate = totalAttempts > 0
            ? Math.round((passedAttempts / totalAttempts) * 100)
            : 0;
        // Calculate question difficulty distribution
        const questionsByDifficulty = {
            EASY: subject.questions.filter((q) => q.difficulty === "EASY").length,
            MEDIUM: subject.questions.filter((q) => q.difficulty === "MEDIUM")
                .length,
            HARD: subject.questions.filter((q) => q.difficulty === "HARD").length,
            EXPERT: subject.questions.filter((q) => q.difficulty === "EXPERT")
                .length,
        };
        // Calculate question success rates
        const questionSuccessRates = subject.questions.map((q) => {
            const totalAnswers = q.studentAnswers.length;
            const correctAnswers = q.studentAnswers.filter((a) => a.isCorrect).length;
            return totalAnswers > 0
                ? Math.round((correctAnswers / totalAnswers) * 100)
                : 0;
        });
        const averageQuestionSuccessRate = questionSuccessRates.length > 0
            ? Math.round(questionSuccessRates.reduce((a, b) => a + b, 0) /
                questionSuccessRates.length)
            : 0;
        // Calculate readiness score (0-100)
        const readinessScore = Math.round((averageScore * 0.4 +
            passingRate * 0.3 +
            averageQuestionSuccessRate * 0.3) /
            100 *
            100);
        // Estimate total students (assuming average section size)
        const estimatedTotalStudents = totalSections * 40; // Rough estimate
        // Categorize by readiness
        const readinessDistribution = {
            ready: Math.ceil((passingRate / 100) * estimatedTotalStudents),
            atRisk: Math.ceil(((100 - passingRate) / 100) * estimatedTotalStudents),
        };
        // Group exam attempts by performance level
        const studentPerformance = {
            highPerformers: allExamAttempts.filter((a) => a.score >= 85).length,
            averagePerformers: allExamAttempts.filter((a) => a.score >= 60 && a.score < 85).length,
            lowPerformers: allExamAttempts.filter((a) => a.score < 60).length,
        };
        return res.status(200).json({
            success: true,
            data: {
                subject: {
                    id: subject.id,
                    name: subject.name,
                    code: subject.code,
                    description: subject.description,
                },
                overview: {
                    totalSections,
                    totalExams,
                    totalQuestions,
                    totalAttempts,
                    estimatedTotalStudents,
                },
                performance: {
                    averageScore,
                    passingRate,
                    averageQuestionSuccessRate,
                    readinessScore,
                },
                sections: subject.sectionSubjects.map((ss) => ({
                    id: ss.section.id,
                    name: ss.section.name,
                    yearLevel: ss.section.yearLevel,
                    program: ss.section.program,
                    faculty: ss.faculty
                        ? { id: ss.faculty.id, name: ss.faculty.name }
                        : null,
                })),
                questionsByDifficulty,
                studentPerformance,
                readinessDistribution,
            },
        });
    }
    catch (error) {
        console.error("Error fetching subject analytics:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch subject analytics",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getSubjectAnalyticsController = getSubjectAnalyticsController;
