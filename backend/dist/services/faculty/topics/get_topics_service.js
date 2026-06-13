"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopicsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getTopicsService = async (facultyId, subjectId) => {
    const subject = await prisma_1.default.subject.findFirst({
        where: {
            id: subjectId,
            faculties: {
                some: {
                    facultyId,
                },
            },
        },
    });
    if (!subject) {
        throw new Error("Subject not found");
    }
    const topics = await prisma_1.default.topic.findMany({
        where: {
            subjectId,
        },
        include: {
            questions: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
    return topics.map((topic) => ({
        id: topic.id,
        name: topic.name,
        description: topic.description,
        totalQuestions: topic.questions.length,
        isArchived: topic.isArchived,
    }));
};
exports.getTopicsService = getTopicsService;
