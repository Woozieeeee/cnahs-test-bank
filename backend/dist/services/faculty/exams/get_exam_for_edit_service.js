"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamForEditService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getExamForEditService = async (facultyId, subjectId, examId) => {
    // Verify faculty owns this subject
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
        throw new Error("Subject not found or unauthorized");
    }
    // Fetch exam with all related data needed for editing
    const exam = await prisma_1.default.exam.findFirst({
        where: {
            id: examId,
            subjectId,
            createdById: facultyId,
        },
        include: {
            examQuestions: {
                select: {
                    questionId: true,
                },
            },
            section: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    if (!exam) {
        throw new Error("Exam not found or unauthorized");
    }
    return {
        id: exam.id,
        title: exam.title,
        description: exam.description,
        examCode: exam.examCode,
        difficulty: exam.difficulty,
        duration: exam.duration,
        passingScore: exam.passingScore,
        startsAt: exam.startsAt?.toISOString() || null,
        endsAt: exam.endsAt?.toISOString() || null,
        sectionIds: [exam.sectionId],
        questionIds: exam.examQuestions.map((eq) => eq.questionId),
        randomizeQuestions: exam.randomizeQuestions,
        randomizeAnswers: exam.randomizeOptions,
        showResultAfterSubmission: exam.showResultAfterSubmission,
        showCorrectAnswers: exam.showCorrectAnswers,
        showExplanations: exam.showExplanations,
        requireFullscreen: exam.requireFullscreen,
        detectTabSwitch: exam.detectTabSwitch,
        detectWindowBlur: exam.detectWindowBlur,
        blockCopy: exam.blockCopy,
        blockPaste: exam.blockPaste,
        blockRightClick: exam.blockRightClick,
        detectDeviceChange: exam.detectDeviceChange,
        violationThreshold: exam.violationThreshold,
        thresholdAction: exam.thresholdAction,
        status: exam.status,
        section: exam.section,
    };
};
exports.getExamForEditService = getExamForEditService;
