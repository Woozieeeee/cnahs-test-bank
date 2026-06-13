"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectQuestionsService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const getSubjectQuestionsService = async (subjectId) => {
    const questions = await prisma_1.default.question.findMany({
        where: {
            subjectId,
        },
        include: {
            studentAnswers: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
    return questions.map((question) => {
        const attempts = question.studentAnswers.length;
        const correctAnswers = question.studentAnswers.filter((answer) => answer.isCorrect).length;
        const successRate = attempts === 0 ? 0 : Math.round((correctAnswers / attempts) * 100);
        return {
            id: question.id,
            topic: question.topicId,
            difficulty: question.difficulty,
            successRate,
            attempts,
        };
    });
};
exports.getSubjectQuestionsService = getSubjectQuestionsService;
