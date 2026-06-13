"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectsService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const getSubjectsService = async (tab) => {
    const subjects = await prisma_1.default.subject.findMany({
        where: {
            ...(tab === "ACTIVE" && {
                isArchived: false,
            }),
            ...(tab === "ARCHIVED" && {
                isArchived: true,
            }),
        },
        include: {
            faculties: {
                include: {
                    faculty: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            sectionSubjects: {
                include: {
                    section: {
                        include: {
                            users: {
                                select: {
                                    id: true,
                                    role: true,
                                },
                            },
                        },
                    },
                },
            },
            exams: {
                select: {
                    id: true,
                },
            },
            questions: {
                select: {
                    id: true,
                },
            },
        },
        orderBy: [
            {
                isArchived: "asc",
            },
            {
                updatedAt: "desc",
            },
        ],
    });
    return subjects.map((subject) => {
        const totalStudents = subject.sectionSubjects.reduce((total, assignment) => total +
            assignment.section.users.filter((user) => user.role === "STUDENT")
                .length, 0);
        return {
            ...subject,
            totalStudents,
            totalQuestions: subject.questions.length,
            totalExams: subject.exams.length,
        };
    });
};
exports.getSubjectsService = getSubjectsService;
