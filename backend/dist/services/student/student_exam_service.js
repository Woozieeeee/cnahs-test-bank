"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamData = getExamData;
const prisma_1 = __importDefault(require("../../lib/prisma"));
/**
 * Get exam details with all questions and faculty-configured settings
 * Used by students to load exam data before starting
 */
async function getExamData(examId) {
    try {
        const exam = await prisma_1.default.exam.findUnique({
            where: { id: examId },
            include: {
                examQuestions: {
                    include: {
                        question: {
                            include: {
                                options: true,
                            },
                        },
                    },
                },
            },
        });
        if (!exam) {
            return null;
        }
        // Transform questions to match frontend interface
        const questions = exam.examQuestions.map((eq) => {
            const question = eq.question;
            // Determine question type based on options
            let type = "MULTIPLE_CHOICE";
            if (question.options.length === 2) {
                // Check if it's a true/false question
                const optionTexts = question.options.map((o) => o.optionText.toLowerCase());
                if ((optionTexts.includes("true") && optionTexts.includes("false")) ||
                    (optionTexts.includes("yes") && optionTexts.includes("no"))) {
                    type = "TRUE_FALSE";
                }
            }
            return {
                id: question.id,
                text: question.question,
                type,
                options: question.options.map((opt) => opt.optionText),
                difficulty: question.difficulty,
            };
        });
        // Build config object from exam settings
        const config = {
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
        };
        return {
            id: exam.id,
            title: exam.title,
            description: exam.description,
            totalQuestions: exam.totalQuestions,
            duration: exam.duration,
            passingScore: exam.passingScore,
            questions,
            config,
            startsAt: exam.startsAt,
            endsAt: exam.endsAt,
        };
    }
    catch (error) {
        console.error("[ExamService] Error fetching exam data:", error);
        throw error;
    }
}
