"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacultySectionsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getFacultySectionsService = async (facultyId) => {
    const sections = await prisma_1.default.section.findMany({
        where: {
            sectionSubjects: {
                some: {
                    facultyId,
                },
            },
        },
        include: {
            sectionSubjects: {
                include: {
                    subject: {
                        include: {
                            exams: {
                                where: {
                                    isArchived: false,
                                },
                                include: {
                                    attempts: {
                                        select: {
                                            score: true,
                                        },
                                    },
                                    examQuestions: {
                                        select: {
                                            id: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            name: "asc",
        },
    });
    return sections.map((section) => {
        const allExams = section.sectionSubjects.flatMap((ss) => ss.subject.exams);
        const totalExams = allExams.length;
        const scheduledExams = allExams.filter((exam) => exam.status === "SCHEDULED").length;
        const ongoingExams = allExams.filter((exam) => exam.status === "ONGOING").length;
        const completedExams = allExams.filter((exam) => exam.status === "COMPLETED").length;
        const totalAttempts = allExams.reduce((sum, exam) => sum + exam.attempts.length, 0);
        const totalQuestions = allExams.reduce((sum, exam) => sum + exam.examQuestions.length, 0);
        const averageScore = totalAttempts === 0
            ? 0
            : Math.round(allExams.reduce((sum, exam) => sum +
                exam.attempts.reduce((attemptSum, attempt) => attemptSum + attempt.score, 0), 0) / totalAttempts);
        return {
            id: section.id,
            name: section.name,
            totalExams,
            scheduledExams,
            ongoingExams,
            completedExams,
            totalAttempts,
            totalQuestions,
            averageScore,
        };
    });
};
exports.getFacultySectionsService = getFacultySectionsService;
