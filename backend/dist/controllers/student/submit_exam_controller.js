"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitExamController = void 0;
const client_1 = require("@prisma/client");
const faculty_notification_handler_1 = require("../../services/notification/faculty_notification_handler");
const student_notification_handler_1 = require("../../services/notification/student_notification_handler");
const prisma = new client_1.PrismaClient();
const submitExamController = async (req, res) => {
    try {
        const studentId = req.user?.id;
        const examIdParam = Array.isArray(req.params.examId)
            ? req.params.examId[0]
            : req.params.examId;
        const examId = parseInt(examIdParam);
        const { answers, violations, answeredCount } = req.body;
        console.log(`[SubmitExam] Student ${studentId} submitting exam ${examId}`, {
            answersCount: Object.keys(answers).length,
            answeredCount,
            violationsCount: violations?.length || 0,
        });
        if (!studentId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Student ID not found",
            });
        }
        if (isNaN(examId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid exam ID",
            });
        }
        // Get the exam details with questions
        const exam = await prisma.exam.findUnique({
            where: { id: examId },
            include: {
                subject: true,
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
            return res.status(404).json({
                success: false,
                message: "Exam not found",
            });
        }
        // Check if student already has a completed attempt for this exam
        const existingAttempt = await prisma.examAttempt.findFirst({
            where: {
                examId,
                studentId,
                status: {
                    in: ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"],
                },
            },
        });
        if (existingAttempt) {
            return res.status(400).json({
                success: false,
                message: "You have already completed this exam",
            });
        }
        // Calculate score by checking answers against correct options
        let correctCount = 0;
        let totalQuestionsToScore = exam.examQuestions.length;
        exam.examQuestions.forEach((examQuestion) => {
            const question = examQuestion.question;
            const studentAnswer = answers[question.id];
            if (studentAnswer) {
                const correctOption = question.options.find((opt) => opt.isCorrect);
                if (correctOption && correctOption.id.toString() === studentAnswer) {
                    correctCount++;
                }
            }
        });
        // Calculate percentage score
        const score = totalQuestionsToScore > 0 ? Math.round((correctCount / totalQuestionsToScore) * 100) : 0;
        console.log(`[SubmitExam] Score calculated: ${correctCount}/${totalQuestionsToScore} = ${score}%`);
        // Create or update exam attempt
        let attempt = await prisma.examAttempt.findFirst({
            where: {
                examId,
                studentId,
            },
        });
        if (attempt) {
            attempt = await prisma.examAttempt.update({
                where: { id: attempt.id },
                data: {
                    score,
                    status: "SUBMITTED",
                    submittedAt: new Date(),
                },
            });
        }
        else {
            attempt = await prisma.examAttempt.create({
                data: {
                    examId,
                    studentId,
                    score,
                    status: "SUBMITTED",
                    startedAt: new Date(),
                    submittedAt: new Date(),
                },
            });
        }
        console.log(`[SubmitExam] Attempt created/updated:`, attempt.id);
        // Determine if the student passed
        const passed = score >= exam.passingScore;
        // Update student progress for this difficulty tier
        const difficulty = exam.difficulty;
        // Get all exams for this difficulty in this subject for this student
        const allAttemptsForDifficulty = await prisma.examAttempt.findMany({
            where: {
                studentId,
                exam: {
                    subjectId: exam.subjectId,
                    difficulty,
                    isArchived: false,
                },
            },
        });
        // Check if student has passed at least one exam in this difficulty
        const hasPassedDifficulty = allAttemptsForDifficulty.some((a) => a.score >= exam.passingScore && ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"].includes(a.status));
        // Update SubjectProgress with the latest score for this difficulty
        await prisma.subjectProgress.upsert({
            where: {
                studentId_subjectId: {
                    studentId,
                    subjectId: exam.subjectId,
                },
            },
            create: {
                studentId,
                subjectId: exam.subjectId,
                easyScore: difficulty === "EASY" ? score : 0,
                mediumScore: difficulty === "MEDIUM" ? score : 0,
                hardScore: difficulty === "HARD" ? score : 0,
                expertScore: difficulty === "EXPERT" ? score : 0,
            },
            update: {
                easyScore: difficulty === "EASY" ? score : undefined,
                mediumScore: difficulty === "MEDIUM" ? score : undefined,
                hardScore: difficulty === "HARD" ? score : undefined,
                expertScore: difficulty === "EXPERT" ? score : undefined,
            },
        });
        console.log(`[SubmitExam] SubjectProgress updated. Student passed difficulty: ${hasPassedDifficulty}`);
        void faculty_notification_handler_1.facultyNotificationHandler
            .notifyStudentSubmissionReceived(attempt.id)
            .catch((error) => {
            console.error("Failed to send faculty submission notification:", error);
        });
        if (exam.showResultAfterSubmission) {
            void student_notification_handler_1.studentNotificationHandler
                .notifyExamResultPublished(attempt.id)
                .catch((error) => {
                console.error("Failed to send student result notification:", error);
            });
        }
        return res.status(200).json({
            success: true,
            message: "Exam submitted successfully",
            data: {
                attemptId: attempt.id,
                score,
                passed,
                difficulty,
            },
        });
    }
    catch (error) {
        console.error("[SubmitExam] Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to submit exam",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.submitExamController = submitExamController;
