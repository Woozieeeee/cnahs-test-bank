"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSubjectGrading = exports.calculateTierGrading = exports.calculateExamGrading = exports.getLetterGrade = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Get letter grade based on percentage score
 * A+: 98-100, A: 93-97, B: 85-92, C: 75-84, D: 60-74, F: 0-59
 */
const getLetterGrade = (percentage) => {
    if (percentage >= 98)
        return "A+";
    if (percentage >= 93)
        return "A";
    if (percentage >= 85)
        return "B";
    if (percentage >= 75)
        return "C";
    if (percentage >= 60)
        return "D";
    return "F";
};
exports.getLetterGrade = getLetterGrade;
/**
 * Calculate grading metrics for a single exam attempt
 */
const calculateExamGrading = async (examId, attemptId) => {
    const attempt = await prisma.examAttempt.findUnique({
        where: { id: attemptId },
        include: {
            exam: {
                select: {
                    totalQuestions: true,
                    passingScore: true,
                },
            },
            answers: {
                select: {
                    isCorrect: true,
                },
            },
        },
    });
    if (!attempt)
        return null;
    const totalQuestions = attempt.exam.totalQuestions;
    const answeredQuestions = attempt.answers.length;
    const correctAnswers = attempt.answers.filter((a) => a.isCorrect).length;
    const wrongAnswers = answeredQuestions - correctAnswers;
    const unansweredQuestions = totalQuestions - answeredQuestions;
    const score = attempt.score;
    const passed = score >= attempt.exam.passingScore;
    return {
        examId,
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        unansweredQuestions,
        score: Math.round(score),
        passed,
        passingScore: attempt.exam.passingScore,
        correctPercentage: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
        wrongPercentage: totalQuestions > 0 ? Math.round((wrongAnswers / totalQuestions) * 100) : 0,
        unansweredPercentage: totalQuestions > 0 ? Math.round((unansweredQuestions / totalQuestions) * 100) : 0,
    };
};
exports.calculateExamGrading = calculateExamGrading;
/**
 * Calculate grading statistics for a difficulty tier
 */
const calculateTierGrading = async (studentId, subjectId, tier) => {
    // Get all exams in this tier
    const tieredExams = await prisma.exam.findMany({
        where: {
            subjectId,
            difficulty: tier,
            isArchived: false,
        },
        select: {
            id: true,
            totalQuestions: true,
            passingScore: true,
        },
    });
    const totalExamsAvailable = tieredExams.length;
    // Get all attempts for this student in this tier
    const attempts = await prisma.examAttempt.findMany({
        where: {
            studentId,
            exam: {
                subjectId,
                difficulty: tier,
                isArchived: false,
            },
        },
        include: {
            exam: {
                select: {
                    totalQuestions: true,
                    passingScore: true,
                },
            },
            answers: {
                select: {
                    isCorrect: true,
                },
            },
        },
    });
    const totalExamsAttempted = attempts.length;
    // Categorize attempts
    const completedExams = attempts.filter((a) => ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"].includes(a.status) &&
        a.score >= a.exam.passingScore).length;
    const unansweredExams = attempts.filter((a) => ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"].includes(a.status) &&
        a.score < a.exam.passingScore).length;
    const pendingExams = totalExamsAvailable - totalExamsAttempted;
    // Calculate scoring metrics
    const completedAttempts = attempts.filter((a) => ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"].includes(a.status));
    const averageScore = completedAttempts.length > 0
        ? Math.round(completedAttempts.reduce((sum, a) => sum + a.score, 0) / completedAttempts.length)
        : 0;
    const highestScore = completedAttempts.length > 0
        ? Math.max(...completedAttempts.map((a) => a.score))
        : null;
    const lowestScore = completedAttempts.length > 0
        ? Math.min(...completedAttempts.map((a) => a.score))
        : null;
    // Get passing score for this tier
    const tierThreshold = await prisma.difficultyThreshold.findFirst({
        where: {
            subjectId,
            difficulty: tier,
        },
    });
    const passingScore = tierThreshold?.passingScore || 75;
    // Aggregate question breakdown
    let totalCorrectAnswers = 0;
    let totalWrongAnswers = 0;
    let totalUnansweredQuestions = 0;
    attempts.forEach((attempt) => {
        const correctCount = attempt.answers.filter((a) => a.isCorrect).length;
        totalCorrectAnswers += correctCount;
        totalWrongAnswers += attempt.answers.length - correctCount;
        totalUnansweredQuestions += attempt.exam.totalQuestions - attempt.answers.length;
    });
    // Calculate percentages
    const completionRate = totalExamsAvailable > 0
        ? Math.round(((totalExamsAttempted) / totalExamsAvailable) * 100)
        : 0;
    const passedExams = completedExams;
    const successRate = completedAttempts.length > 0 ? Math.round((passedExams / completedAttempts.length) * 100) : 0;
    const totalQuestionsAnswered = totalCorrectAnswers + totalWrongAnswers;
    const overallAccuracy = totalQuestionsAnswered > 0
        ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100)
        : 0;
    const grade = (0, exports.getLetterGrade)(averageScore);
    return {
        tier,
        totalExamsAvailable,
        totalExamsAttempted,
        completedExams,
        unansweredExams,
        pendingExams,
        averageScore,
        highestScore: highestScore ? Math.round(highestScore) : null,
        lowestScore: lowestScore ? Math.round(lowestScore) : null,
        passingScore,
        totalCorrectAnswers,
        totalWrongAnswers,
        totalUnansweredQuestions,
        completionRate,
        successRate,
        overallAccuracy,
        grade,
    };
};
exports.calculateTierGrading = calculateTierGrading;
/**
 * Calculate comprehensive grading statistics for a subject
 */
const calculateSubjectGrading = async (studentId, subjectId) => {
    // Get subject details
    const subject = await prisma.subject.findUnique({
        where: { id: subjectId },
        select: {
            id: true,
            name: true,
            code: true,
        },
    });
    if (!subject)
        return null;
    // Calculate grading for each tier
    const difficulties = ["EASY", "MEDIUM", "HARD", "EXPERT"];
    const tierStats = [];
    let totalExamsAvailable = 0;
    let totalExamsAttempted = 0;
    let completedExams = 0;
    let unansweredExams = 0;
    let totalCorrectAnswers = 0;
    let totalWrongAnswers = 0;
    let totalUnansweredQuestions = 0;
    const allScores = [];
    for (const difficulty of difficulties) {
        const tierGrading = await (0, exports.calculateTierGrading)(studentId, subjectId, difficulty);
        tierStats.push(tierGrading);
        totalExamsAvailable += tierGrading.totalExamsAvailable;
        totalExamsAttempted += tierGrading.totalExamsAttempted;
        completedExams += tierGrading.completedExams;
        unansweredExams += tierGrading.unansweredExams;
        totalCorrectAnswers += tierGrading.totalCorrectAnswers;
        totalWrongAnswers += tierGrading.totalWrongAnswers;
        totalUnansweredQuestions += tierGrading.totalUnansweredQuestions;
        if (tierGrading.averageScore > 0) {
            allScores.push(tierGrading.averageScore);
        }
    }
    // Calculate overall metrics
    const overallAverageScore = allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;
    const overallHighestScore = allScores.length > 0 ? Math.max(...allScores) : null;
    const completionRate = totalExamsAvailable > 0
        ? Math.round((totalExamsAttempted / totalExamsAvailable) * 100)
        : 0;
    const successRate = totalExamsAttempted > 0
        ? Math.round((completedExams / totalExamsAttempted) * 100)
        : 0;
    const totalQuestionsAnswered = totalCorrectAnswers + totalWrongAnswers;
    const overallAccuracy = totalQuestionsAnswered > 0
        ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100)
        : 0;
    const overallGrade = (0, exports.getLetterGrade)(overallAverageScore);
    return {
        subjectId,
        subjectName: subject.name,
        subjectCode: subject.code,
        totalExamsAvailable,
        totalExamsAttempted,
        completedExams,
        unansweredExams,
        overallAverageScore,
        overallHighestScore,
        totalCorrectAnswers,
        totalWrongAnswers,
        totalUnansweredQuestions,
        completionRate,
        successRate,
        overallAccuracy,
        tierStats,
        overallGrade,
    };
};
exports.calculateSubjectGrading = calculateSubjectGrading;
