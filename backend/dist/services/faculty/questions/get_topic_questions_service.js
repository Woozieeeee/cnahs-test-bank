"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopicQuestionsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getTopicQuestionsService = async (facultyId, topicId) => {
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
    });
    if (!topic) {
        throw new Error("Topic not found");
    }
    const questions = await prisma_1.default.question.findMany({
        where: {
            topicId,
        },
        include: {
            options: {
                select: {
                    id: true,
                    optionText: true,
                    isCorrect: true,
                },
            },
        },
    });
    const difficultyOrder = {
        EASY: 1,
        MEDIUM: 2,
        HARD: 3,
        EXPERT: 4,
    };
    return questions.sort((a, b) => {
        // =========================
        // ACTIVE FIRST
        // =========================
        if (a.isArchived !== b.isArchived) {
            return Number(a.isArchived) - Number(b.isArchived);
        }
        // =========================
        // DIFFICULTY ORDER
        // EASY -> MEDIUM -> HARD -> EXPERT
        // =========================
        const difficultyComparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        if (difficultyComparison !== 0) {
            return difficultyComparison;
        }
        // =========================
        // NEWEST FIRST
        // =========================
        return b.createdAt.getTime() - a.createdAt.getTime();
    });
};
exports.getTopicQuestionsService = getTopicQuestionsService;
