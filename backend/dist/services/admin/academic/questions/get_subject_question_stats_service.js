"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectQuestionStatsService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const getSubjectQuestionStatsService = async (subjectId) => {
    const questions = await prisma_1.default.question.findMany({
        where: {
            subjectId,
        },
        include: {
            studentAnswers: true,
        },
    });
    const totalQuestions = questions.length;
    const totalTopics = new Set(questions.map((question) => question.topicId))
        .size;
    let totalSuccessRate = 0;
    let weakQuestions = 0;
    for (const question of questions) {
        const attempts = question.studentAnswers.length;
        const correctAnswers = question.studentAnswers.filter((answer) => answer.isCorrect).length;
        const successRate = attempts === 0 ? 0 : (correctAnswers / attempts) * 100;
        totalSuccessRate += successRate;
        if (successRate < 50) {
            weakQuestions++;
        }
    }
    const averageSuccessRate = totalQuestions === 0 ? 0 : Math.round(totalSuccessRate / totalQuestions);
    return {
        totalQuestions,
        totalTopics,
        weakQuestions,
        averageSuccessRate,
    };
};
exports.getSubjectQuestionStatsService = getSubjectQuestionStatsService;
