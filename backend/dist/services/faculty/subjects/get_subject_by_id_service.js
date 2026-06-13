"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectByIdService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getSubjectByIdService = async (facultyId, subjectId) => {
    const subject = await prisma_1.default.subject.findFirst({
        where: {
            id: subjectId,
            faculties: {
                some: {
                    facultyId,
                },
            },
        },
        include: {
            questions: {
                include: {
                    topic: true,
                },
            },
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
    });
    if (!subject) {
        throw new Error("Subject not found");
    }
    const topicIds = new Set();
    subject.questions.forEach((question) => {
        if (question.topicId) {
            topicIds.add(question.topicId);
        }
    });
    const studentIds = new Set();
    subject.sectionSubjects.forEach((sectionSubject) => {
        sectionSubject.section.users.forEach((student) => {
            studentIds.add(student.id);
        });
    });
    return {
        id: subject.id,
        code: subject.code,
        name: subject.name,
        description: subject.description,
        totalTopics: topicIds.size,
        totalQuestions: subject.questions.length,
        totalAssessments: subject.exams.length,
        totalSections: subject.sectionSubjects.length,
        totalStudents: studentIds.size,
    };
};
exports.getSubjectByIdService = getSubjectByIdService;
