"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopicDependencies = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getTopicDependencies = async (topicId) => {
    const questionCount = await prisma_1.default.question.count({
        where: {
            topicId,
        },
    });
    const exams = await prisma_1.default.exam.findMany({
        where: {
            examQuestions: {
                some: {
                    question: {
                        topicId,
                    },
                },
            },
            isArchived: false,
        },
        select: {
            id: true,
            title: true,
            section: {
                select: {
                    name: true,
                },
            },
        },
    });
    return {
        questionCount,
        exams,
    };
};
exports.getTopicDependencies = getTopicDependencies;
