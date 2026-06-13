"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionDependencies = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getQuestionDependencies = async (questionId) => {
    const examQuestions = await prisma_1.default.examQuestion.findMany({
        where: {
            questionId,
            exam: {
                status: {
                    in: ["DRAFT", "SCHEDULED", "ONGOING"],
                },
            },
        },
        include: {
            exam: {
                include: {
                    subject: {
                        select: {
                            name: true,
                        },
                    },
                    section: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
    return {
        examCount: examQuestions.length,
        exams: examQuestions.map((item) => ({
            id: item.exam.id,
            title: item.exam.title,
            status: item.exam.status,
            subject: item.exam.subject.name,
            section: item.exam.section.name,
        })),
    };
};
exports.getQuestionDependencies = getQuestionDependencies;
