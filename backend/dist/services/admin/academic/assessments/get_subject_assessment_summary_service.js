"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectAssessmentSummaryService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const getSubjectAssessmentSummaryService = async (subjectId) => {
    const exams = await prisma_1.default.exam.findMany({
        where: {
            subjectId,
        },
        include: {
            attempts: {
                select: {
                    score: true,
                },
            },
        },
    });
    const totalAssessments = exams.length;
    const completedAssessments = exams.filter((exam) => exam.status === "COMPLETED").length;
    const activeAssessments = exams.filter((exam) => exam.status === "ONGOING" || exam.status === "SCHEDULED").length;
    const scores = exams.flatMap((exam) => exam.attempts.map((attempt) => attempt.score));
    const averageScore = scores.length === 0
        ? 0
        : Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
    return {
        totalAssessments,
        averageScore,
        completedAssessments,
        activeAssessments,
    };
};
exports.getSubjectAssessmentSummaryService = getSubjectAssessmentSummaryService;
