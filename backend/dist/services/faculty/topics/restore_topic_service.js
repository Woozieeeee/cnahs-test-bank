"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreTopicService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const restoreTopicService = async (facultyId, topicId) => {
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
    const restoredTopic = await prisma_1.default.topic.update({
        where: {
            id: topicId,
        },
        data: {
            isArchived: false,
        },
        include: {
            questions: true,
        },
    });
    return {
        id: restoredTopic.id,
        name: restoredTopic.name,
        description: restoredTopic.description,
        totalQuestions: restoredTopic.questions.length,
        isArchived: restoredTopic.isArchived,
    };
};
exports.restoreTopicService = restoreTopicService;
