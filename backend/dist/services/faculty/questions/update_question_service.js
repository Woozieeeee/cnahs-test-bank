"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuestionService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const updateQuestionService = async ({ facultyId, questionId, question, explanation, difficulty, correctAnswer, options, }) => {
    const existingQuestion = await prisma_1.default.question.findFirst({
        where: {
            id: questionId,
            subject: {
                faculties: {
                    some: {
                        facultyId,
                    },
                },
            },
        },
        include: {
            options: true,
        },
    });
    if (!existingQuestion) {
        throw new Error("Question not found");
    }
    const cleanOptions = options.map((option) => option.trim()).filter(Boolean);
    if (cleanOptions.length < 4) {
        throw new Error("All four options are required");
    }
    if (!cleanOptions.includes(correctAnswer)) {
        throw new Error("Correct answer must match one of the options");
    }
    await prisma_1.default.questionOption.deleteMany({
        where: {
            questionId,
        },
    });
    const updatedQuestion = await prisma_1.default.question.update({
        where: {
            id: questionId,
        },
        data: {
            question,
            explanation,
            difficulty: difficulty,
            correctAnswer,
            options: {
                create: cleanOptions.map((option) => ({
                    optionText: option,
                    isCorrect: option === correctAnswer,
                })),
            },
        },
        include: {
            topic: true,
            options: true,
        },
    });
    return updatedQuestion;
};
exports.updateQuestionService = updateQuestionService;
