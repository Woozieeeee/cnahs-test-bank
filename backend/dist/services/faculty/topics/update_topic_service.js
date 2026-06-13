"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTopicService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const updateTopicService = async ({ facultyId, topicId, name, description, }) => {
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
    const normalizedName = name.trim().toLowerCase();
    const existingTopics = await prisma_1.default.topic.findMany({
        where: {
            subjectId: topic.subjectId,
            NOT: {
                id: topicId,
            },
        },
        select: {
            name: true,
        },
    });
    const duplicate = existingTopics.find((item) => item.name.trim().toLowerCase() === normalizedName);
    if (duplicate) {
        throw new Error("Topic already exists");
    }
    const updatedTopic = await prisma_1.default.topic.update({
        where: {
            id: topicId,
        },
        data: {
            name,
            description,
        },
        include: {
            questions: true,
        },
    });
    return {
        id: updatedTopic.id,
        name: updatedTopic.name,
        description: updatedTopic.description,
        totalQuestions: updatedTopic.questions.length,
        isArchived: updatedTopic.isArchived || false,
    };
};
exports.updateTopicService = updateTopicService;
