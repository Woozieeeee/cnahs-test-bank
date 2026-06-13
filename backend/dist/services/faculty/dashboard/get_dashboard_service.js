"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getDashboardService = async (facultyId) => {
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
    });
    const totalSubjects = subjects.length;
    const totalQuestions = subjects.reduce((sum, subject) => sum + subject.questions.length, 0);
    const totalExams = subjects.reduce((sum, subject) => sum + subject.exams.length, 0);
    const sectionIds = new Set();
    const studentIds = new Set();
    subjects.forEach((subject) => {
        subject.sectionSubjects.forEach((sectionSubject) => {
            sectionIds.add(sectionSubject.section.id);
            sectionSubject.section.users.forEach((student) => {
                studentIds.add(student.id);
            });
        });
    });
    const upcomingExams = subjects.flatMap((subject) => subject.exams.map((exam) => ({
        id: exam.id,
        title: exam.title,
        subject: subject.name,
        difficulty: exam.difficulty,
        scheduledAt: exam.startsAt,
    })));
    return {
        assignedSubjects: totalSubjects,
        totalSections: sectionIds.size,
        totalStudents: studentIds.size,
        totalQuestions,
        totalAssessments: totalExams,
        subjects: subjects.map((subject) => ({
            id: subject.id,
            code: subject.code,
            name: subject.name,
            sections: subject.sectionSubjects.length,
            students: subject.sectionSubjects.reduce((sum, sectionSubject) => sum + sectionSubject.section.users.length, 0),
            questions: subject.questions.length,
            assessments: subject.exams.length,
        })),
        upcomingExams,
    };
};
exports.getDashboardService = getDashboardService;
