"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveQuestionService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const question_dependency_checker_1 = require("../../../utils/question_dependency_checker");
const archiveQuestionService = async (facultyId, questionId) => {
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
    const dependencies = await (0, question_dependency_checker_1.getQuestionDependencies)(questionId);
    if (dependencies.exams.length > 0) {
        const error = new Error("Question has active dependencies");
        error.dependencies = dependencies;
        throw error;
    }
    return prisma_1.default.question.update({
        where: {
            id: questionId,
        },
        data: {
            isArchived: true,
        },
    });
};
exports.archiveQuestionService = archiveQuestionService;
