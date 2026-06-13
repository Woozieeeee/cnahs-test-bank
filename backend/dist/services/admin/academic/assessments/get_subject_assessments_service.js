"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectAssessmentsService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const getSubjectAssessmentsService = async (subjectId) => {
    const exams = await prisma_1.default.exam.findMany({
        where: {
            subjectId,
        },
        include: {
            attempts: true,
            section: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
    return exams.map((exam) => {
        const students = exam.attempts.length;
        const averageScore = students === 0
            ? 0
            : Math.round(exam.attempts.reduce((sum, attempt) => sum + attempt.score, 0) /
                students);
        return {
            id: exam.id,
            title: exam.title,
            difficulty: exam.difficulty,
            status: exam.status,
            sections: 1,
            students,
            averageScore,
        };
    });
};
exports.getSubjectAssessmentsService = getSubjectAssessmentsService;
