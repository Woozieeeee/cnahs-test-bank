"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTopicService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const createTopicService = async ({ facultyId, subjectId, name, description, }) => {
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
    const normalizedName = name.trim().toLowerCase();
    const existingTopic = await prisma_1.default.topic.findMany({
        where: {
            subjectId,
        },
        select: {
            name: true,
        },
    });
    const duplicate = existingTopic.find((topic) => topic.name.trim().toLowerCase() === normalizedName);
    if (duplicate) {
        throw new Error("Topic already exists");
    }
    const createdTopic = await prisma_1.default.topic.create({
        data: {
            name,
            description,
            subjectId,
        },
    });
    return {
        id: createdTopic.id,
        name: createdTopic.name,
        description: createdTopic.description,
        totalQuestions: 0,
        isArchived: createdTopic.isArchived || false,
    };
};
exports.createTopicService = createTopicService;
