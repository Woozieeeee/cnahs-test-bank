"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreQuestionService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const restoreQuestionService = async (facultyId, questionId) => {
    const question = await prisma_1.default.question.findFirst({
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
    });
    if (!question) {
        throw new Error("Question not found");
    }
    return prisma_1.default.question.update({
        where: {
            id: questionId,
        },
        data: {
            isArchived: false,
        },
    });
};
exports.restoreQuestionService = restoreQuestionService;
