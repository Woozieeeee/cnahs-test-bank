"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveTopicService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const topic_dependency_checker_1 = require("../../../utils/topic_dependency_checker");
const archiveTopicService = async (facultyId, topicId) => {
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
    const dependencies = await (0, topic_dependency_checker_1.getTopicDependencies)(topicId);
    if (dependencies.questionCount > 0 || dependencies.exams.length > 0) {
        const error = new Error("Topic has active dependencies");
        error.dependencies = dependencies;
        throw error;
    }
    const archivedTopic = await prisma_1.default.topic.update({
        where: {
            id: topicId,
        },
        data: {
            isArchived: true,
        },
        include: {
            questions: true,
        },
    });
    return {
        id: archivedTopic.id,
        name: archivedTopic.name,
        description: archivedTopic.description,
        totalQuestions: archivedTopic.questions.length,
        isArchived: archivedTopic.isArchived,
    };
};
exports.archiveTopicService = archiveTopicService;
