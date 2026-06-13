"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const createQuestionService = async ({ facultyId, topicId, question, explanation, difficulty, options, correctAnswer, }) => {
    const topic = await prisma_1.default.topic.findFirst({
        where: {
            id: topicId,
            subject: {
                faculties: {
                    some: {
                        facultyId,
                    },
                },
            },
        },
        include: {
            subject: true,
        },
    });
    if (!topic) {
        throw new Error("Topic not found");
    }
    if (options.length !== 4) {
        throw new Error("Exactly 4 options are required");
    }
    const answerExists = options.some((option) => option.trim() === correctAnswer.trim());
    if (!answerExists) {
        throw new Error("Correct answer must match one of the options");
    }
    const createdQuestion = await prisma_1.default.question.create({
        data: {
            subjectId: topic.subjectId,
            topicId,
            question,
            explanation,
            difficulty,
            correctAnswer,
            options: {
                create: options.map((option) => ({
                    optionText: option,
                    isCorrect: option.trim() === correctAnswer.trim(),
                })),
            },
        },
        include: {
            options: true,
        },
    });
    await prisma_1.default.topic.update({
        where: {
            id: topicId,
        },
        data: {
            totalQuestions: {
                increment: 1,
            },
        },
    });
    await prisma_1.default.subject.update({
        where: {
            id: topic.subjectId,
        },
        data: {
            totalQuestions: {
                increment: 1,
            },
        },
    });
    return createdQuestion;
};
exports.createQuestionService = createQuestionService;
