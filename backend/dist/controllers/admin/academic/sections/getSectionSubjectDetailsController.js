"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSectionSubjectDetailsController = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
/**
 * GET /api/admin/sections/:sectionId/subjects/:subjectId/details
 * Get detailed information about a subject in a specific section
 */
const getSectionSubjectDetailsController = async (req, res) => {
    try {
        const sectionIdParam = Array.isArray(req.params.sectionId)
            ? req.params.sectionId[0]
            : req.params.sectionId;
        const subjectIdParam = Array.isArray(req.params.subjectId)
            ? req.params.subjectId[0]
            : req.params.subjectId;
        const sectionId = parseInt(sectionIdParam, 10);
        const subjectId = parseInt(subjectIdParam, 10);
        if (isNaN(sectionId) || isNaN(subjectId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid section or subject ID",
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
        // Get subject details for this section
        const sectionSubject = await prisma_1.default.sectionSubject.findUnique({
            where: {
                sectionId_subjectId: {
                    sectionId,
                    subjectId,
                },
            },
            include: {
                subject: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        description: true,
                        slug: true,
                        totalQuestions: true,
                        totalExams: true,
                    },
                },
                faculty: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                    },
                },
            },
        });
        if (!sectionSubject) {
            return res.status(404).json({
                success: false,
                message: "Subject not assigned to this section",
            });
        }
        // Get exams for this subject in this section
        const exams = await prisma_1.default.exam.findMany({
            where: {
                subjectId,
                sectionId,
                isArchived: false,
            },
            select: {
                id: true,
                title: true,
                difficulty: true,
                duration: true,
                totalQuestions: true,
                passingScore: true,
                startsAt: true,
                status: true,
            },
            orderBy: { startsAt: "desc" },
        });
        // Get questions for this subject in this section
        const questions = await prisma_1.default.question.findMany({
            where: {
                subjectId,
                isArchived: false,
            },
            include: {
                topic: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        // Get students in this section
        const students = await prisma_1.default.user.findMany({
            where: {
                sectionId,
            },
            select: {
                id: true,
                name: true,
                studentId: true,
            },
        });
        // Calculate stats for each student
        const studentPerformance = await Promise.all(students.map(async (student) => {
            const attempts = await prisma_1.default.examAttempt.findMany({
                where: {
                    studentId: student.id,
                    exam: {
                        subjectId,
                        sectionId,
                    },
                },
                select: {
                    score: true,
                    passed: true,
                },
            });
            const totalAttempts = attempts.length;
            const passedAttempts = attempts.filter((a) => a.passed === true).length;
            const avgScore = totalAttempts > 0
                ? attempts.reduce((sum, a) => sum + (a.score || 0), 0) /
                    totalAttempts
                : 0;
            return {
                studentId: student.id,
                name: student.name,
                enrollmentId: student.studentId,
                totalAttempts,
                passedAttempts,
                passRate: totalAttempts > 0 ? (passedAttempts / totalAttempts) * 100 : 0,
                averageScore: Math.round(avgScore * 100) / 100,
            };
        }));
        // Calculate section-level stats
        const allAttempts = await prisma_1.default.examAttempt.findMany({
            where: {
                exam: {
                    subjectId,
                    sectionId,
                },
            },
            select: {
                score: true,
                passed: true,
            },
        });
        const totalAttempts = allAttempts.length;
        const passedCount = allAttempts.filter((a) => a.passed === true).length;
        const avgScoreAll = totalAttempts > 0
            ? allAttempts.reduce((sum, a) => sum + (a.score || 0), 0) /
                totalAttempts
            : 0;
        return res.status(200).json({
            success: true,
            data: {
                section: {
                    id: section.id,
                    name: section.name,
                },
                subject: {
                    id: sectionSubject.subject.id,
                    name: sectionSubject.subject.name,
                    code: sectionSubject.subject.code,
                    slug: sectionSubject.subject.slug,
                    description: sectionSubject.subject.description,
                },
                faculty: sectionSubject.faculty
                    ? {
                        id: sectionSubject.faculty.id,
                        name: sectionSubject.faculty.name,
                        username: sectionSubject.faculty.username,
                    }
                    : null,
                statistics: {
                    totalQuestions: questions.length,
                    totalExams: exams.length,
                    totalStudents: students.length,
                    totalAttempts,
                    passedAttempts: passedCount,
                    passRate: totalAttempts > 0 ? (passedCount / totalAttempts) * 100 : 0,
                    averageScore: Math.round(avgScoreAll * 100) / 100,
                },
                exams: exams.map((e) => ({
                    id: e.id,
                    title: e.title,
                    difficulty: e.difficulty,
                    totalQuestions: e.totalQuestions,
                    duration: e.duration,
                    passingScore: e.passingScore,
                    startsAt: e.startsAt,
                    status: e.status,
                })),
                questions: {
                    count: questions.length,
                    byDifficulty: {
                        EASY: questions.filter((q) => q.difficulty === "EASY").length,
                        MEDIUM: questions.filter((q) => q.difficulty === "MEDIUM").length,
                        HARD: questions.filter((q) => q.difficulty === "HARD").length,
                    },
                    byTopic: Array.from(new Map(questions.map((q) => [
                        q.topic.name,
                        (questions.filter((x) => x.topic.name === q.topic.name) || []).length,
                    ])).entries()).map(([topic, count]) => ({
                        topic,
                        count,
                    })),
                },
                studentPerformance,
            },
        });
    }
    catch (error) {
        console.error("Error fetching section subject details:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch section subject details",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getSectionSubjectDetailsController = getSectionSubjectDetailsController;
