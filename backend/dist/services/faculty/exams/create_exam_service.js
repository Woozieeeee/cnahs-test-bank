"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const faculty_notification_handler_1 = require("../../notification/faculty_notification_handler");
const student_notification_handler_1 = require("../../notification/student_notification_handler");
const createExamService = async ({ facultyId, facultyName, subjectId, payload, }) => {
    if (!payload.questionIds?.length) {
        throw new Error("At least one question must be selected.");
    }
    return prisma_1.default
        .$transaction(async (tx) => {
        const exam = await tx.exam.create({
            data: {
                title: payload.title,
                description: payload.description,
                examCode: payload.examCode,
                difficulty: payload.difficulty,
                subjectId,
                sectionId: payload.sectionIds[0],
                duration: payload.duration,
                passingScore: payload.passingScore,
                startsAt: new Date(payload.startsAt),
                endsAt: new Date(payload.endsAt),
                randomizeQuestions: payload.randomizeQuestions,
                randomizeOptions: payload.randomizeAnswers,
                showResultAfterSubmission: payload.showResultAfterSubmission,
                showCorrectAnswers: payload.showCorrectAnswers,
                showExplanations: payload.showExplanations,
                requireFullscreen: payload.requireFullscreen,
                detectTabSwitch: payload.detectTabSwitch,
                detectWindowBlur: payload.detectWindowBlur,
                blockCopy: payload.blockCopy,
                blockPaste: payload.blockPaste,
                blockRightClick: payload.blockRightClick,
                detectDeviceChange: payload.detectDeviceChange,
                violationThreshold: payload.violationThreshold,
                thresholdAction: payload.thresholdAction,
                status: "SCHEDULED",
                publishedAt: new Date(),
                createdById: facultyId,
                facultyId: facultyId,
                totalQuestions: payload.questionIds.length,
            },
        });
        await tx.examQuestion.createMany({
            data: payload.questionIds.map((questionId) => ({
                examId: exam.id,
                questionId,
            })),
        });
        await tx.subject.update({
            where: {
                id: subjectId,
            },
            data: {
                totalExams: {
                    increment: 1,
                },
            },
        });
        await tx.examDraft.deleteMany({
            where: {
                facultyId,
                subjectId,
            },
        });
        await tx.activityLog.create({
            data: {
                action: "Created exam",
                categories: ["EXAMS"],
                performedBy: facultyName,
                description: `Created exam ${payload.title}`,
            },
        });
        return exam;
    })
        .then((exam) => {
        void faculty_notification_handler_1.facultyNotificationHandler
            .notifyExamCreated(exam.id)
            .catch((error) => {
            console.error("Failed to send faculty exam created notification:", error);
        });
        void faculty_notification_handler_1.facultyNotificationHandler
            .notifyExamPublished(exam.id)
            .catch((error) => {
            console.error("Failed to send faculty exam published notification:", error);
        });
        void student_notification_handler_1.studentNotificationHandler
            .notifyExamScheduled(exam.id)
            .catch((error) => {
            console.error("Failed to send student exam scheduled notifications:", error);
        });
        return exam;
    });
};
exports.createExamService = createExamService;
