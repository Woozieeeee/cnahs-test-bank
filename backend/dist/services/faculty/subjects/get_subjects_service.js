"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getSubjectsService = async (facultyId) => {
    const subjects = await prisma_1.default.subject.findMany({
        where: {
            faculties: {
                some: {
                    facultyId,
                },
            },
        },
        include: {
            questions: true,
            exams: true,
            sectionSubjects: {
                include: {
                    section: {
                        include: {
                            users: {
                                where: {
                                    role: "STUDENT",
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
    return subjects.map((subject) => ({
        id: subject.id,
        code: subject.code,
        name: subject.name,
        description: subject.description,
        totalSections: subject.sectionSubjects.length,
        totalStudents: subject.sectionSubjects.reduce((sum, sectionSubject) => sum + sectionSubject.section.users.length, 0),
        totalQuestions: subject.questions.length,
        totalAssessments: subject.exams.length,
    }));
};
exports.getSubjectsService = getSubjectsService;
