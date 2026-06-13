"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectByIdService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const getSubjectByIdService = async (id) => {
    const subject = await prisma_1.default.subject.findUnique({
        where: {
            id,
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
                            studentRecords: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                },
            },
            exams: {
                where: {
                    isArchived: false,
                },
            },
        },
    });
    if (!subject) {
        return null;
    }
    const totalSections = subject.sectionSubjects.length;
    const totalStudents = subject.sectionSubjects.reduce((total, item) => total + item.section.studentRecords.length, 0);
    const totalAssessments = subject.exams.length;
    return {
        id: subject.id,
        name: subject.name,
        code: subject.code,
        description: subject.description,
        faculties: subject.faculties.map((faculty) => ({
            id: faculty.faculty.id,
            name: faculty.faculty.name,
        })),
        sectionSummary: {
            totalSections,
            totalStudents,
        },
        assessmentSummary: {
            totalAssessments,
        },
        questionBankSummary: {
            totalQuestions: 0,
        },
        analytics: {
            readinessScore: 0,
            status: "COMING_SOON",
        },
    };
};
exports.getSubjectByIdService = getSubjectByIdService;
