"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamBuilderQuestionsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getExamBuilderQuestionsService = async (subjectId, difficulty) => {
    const questions = await prisma_1.default.question.findMany({
        where: {
            subjectId,
            difficulty: difficulty,
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
        orderBy: {
            createdAt: "desc",
        },
    });
    console.log("Exam Builder Question Sample:", JSON.stringify(questions[0], null, 2));
    return questions;
};
exports.getExamBuilderQuestionsService = getExamBuilderQuestionsService;
