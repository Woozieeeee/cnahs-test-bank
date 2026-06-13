"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacultyAssessmentDetailsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getFacultyAssessmentDetailsService = async (facultyId, subjectId, assessmentId) => {
    const subject = await prisma_1.default.subject.findFirst({
        where: {
            id: subjectId,
            faculties: {
                some: {
                    facultyId,
                },
            },
        },
    });
    if (!subject) {
        throw new Error("Subject not found");
    }
    const exam = await prisma_1.default.exam.findFirst({
        where: {
            id: assessmentId,
            subjectId,
        },
        include: {
            attempts: {
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true,
                            studentId: true,
                        },
                    },
                    answers: {
                        include: {
                            question: {
                                include: {
                                    topic: true,
                                },
                            },
                        },
                    },
                },
            },
            examQuestions: {
                include: {
                    question: {
                        include: {
                            topic: true,
                        },
                    },
                },
            },
        },
    });
    if (!exam) {
        throw new Error("Assessment not found");
    }
    const scores = exam.attempts.map((attempt) => attempt.score);
    const students = scores.length;
    const averageScore = students === 0
        ? 0
        : Math.round(scores.reduce((sum, score) => sum + score, 0) /
            students);
    const highestScore = students === 0 ? 0 : Math.max(...scores);
    const lowestScore = students === 0 ? 0 : Math.min(...scores);
    const passingStudents = exam.attempts.filter((attempt) => attempt.score >= exam.passingScore).length;
    const passingRate = students === 0 ? 0 : Math.round((passingStudents / students) * 100);
    const questionStats = await Promise.all(exam.examQuestions.map(async (examQuestion) => {
        const question = examQuestion.question;
        const answers = await prisma_1.default.studentAnswer.findMany({
            where: {
                questionId: question.id,
                attempt: {
                    examId: exam.id,
                },
            },
        });
        const attempts = answers.length;
        const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
        const successRate = attempts === 0 ? 0 : Math.round((correctAnswers / attempts) * 100);
        return {
            id: question.id,
            question: question.question,
            topic: question.topic.name,
            successRate,
        };
    }));
    const weakestQuestions = questionStats
        .sort((a, b) => a.successRate - b.successRate)
        .slice(0, 5);
    const studentResults = exam.attempts.map((attempt) => ({
        id: attempt.id,
        student: {
            id: attempt.student.id,
            name: attempt.student.name,
            studentId: attempt.student.studentId,
        },
        score: attempt.score,
        status: attempt.status,
        startedAt: attempt.startedAt,
        completedAt: attempt.completedAt,
    }));
    return {
        id: exam.id,
        title: exam.title,
        difficulty: exam.difficulty,
        status: exam.status,
        duration: exam.duration,
        passingScore: exam.passingScore,
        randomizeQuestions: exam.randomizeQuestions,
        randomizeOptions: exam.randomizeOptions,
        students,
        averageScore,
        passingRate,
        highestScore,
        lowestScore,
        weakestQuestions,
        studentResults,
        questions: exam.examQuestions.map((eq) => ({
            id: eq.question.id,
            question: eq.question.question,
            difficulty: eq.question.difficulty,
            topic: eq.question.topic.name,
        })),
    };
};
exports.getFacultyAssessmentDetailsService = getFacultyAssessmentDetailsService;
