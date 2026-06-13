"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPassed = exports.getHighestScore = exports.getStudentDashboard = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Get student dashboard data with all subjects, progress, and stats
 */
const getStudentDashboard = async (studentId) => {
    // Get the student's section
    const student = await prisma.user.findUnique({
        where: { id: studentId },
        include: {
            section: {
                include: {
                    sectionSubjects: {
                        include: {
                            subject: {
                                include: {
                                    exams: {
                                        where: { isArchived: false },
                                        select: { id: true, difficulty: true, status: true, startsAt: true, endsAt: true },
                                    },
                                    difficultyThresholds: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    // Get all enrolled subjects for the student (direct enrollments)
    const directEnrollments = await prisma.subjectEnrollment.findMany({
        where: { studentId },
        include: {
            subject: {
                include: {
                    exams: {
                        where: { isArchived: false },
                        select: { id: true, difficulty: true, status: true, startsAt: true, endsAt: true },
                    },
                    difficultyThresholds: true,
                },
            },
        },
    });
    // Combine: subjects from section + direct enrollments
    const sectionSubjects = student?.section?.sectionSubjects.map((ss) => ({
        subject: ss.subject,
    })) || [];
    // Create a unique list of subjects (avoid duplicates)
    const allEnrollments = [
        ...sectionSubjects,
        ...directEnrollments,
    ];
    const uniqueSubjectIds = new Set(allEnrollments.map((e) => e.subject.id));
    const enrollments = allEnrollments.filter((e) => {
        if (uniqueSubjectIds.has(e.subject.id)) {
            uniqueSubjectIds.delete(e.subject.id);
            return true;
        }
        return false;
    });
    // Get student's progress in each subject
    const subjectProgressList = await prisma.subjectProgress.findMany({
        where: { studentId },
    });
    // Get exam attempts to calculate highest scores per difficulty per subject
    const examAttempts = await prisma.examAttempt.findMany({
        where: { studentId, exam: { isArchived: false } },
        include: {
            exam: {
                select: { id: true, difficulty: true, subjectId: true },
            },
        },
    });
    // Build a map of subject progress
    const progressMap = new Map(subjectProgressList.map((p) => [p.subjectId, p]));
    // Calculate highest scores per difficulty per subject
    const scoresBySubjectDifficulty = new Map();
    examAttempts.forEach((attempt) => {
        const key = `${attempt.exam.subjectId}-${attempt.exam.difficulty}`;
        const current = scoresBySubjectDifficulty.get(key);
        const newScore = attempt.score;
        const thresholdEntry = enrollments
            .find((e) => e.subject.id === attempt.exam.subjectId)
            ?.subject.difficultyThresholds.find((t) => t.difficulty === attempt.exam.difficulty);
        const threshold = thresholdEntry?.passingScore || 75;
        const passed = newScore >= threshold;
        if (!current || newScore > current.highest) {
            scoresBySubjectDifficulty.set(key, {
                highest: newScore,
                passed,
            });
        }
    });
    // Build subject cards
    const subjectCards = enrollments.map((enrollment) => {
        const subject = enrollment.subject;
        const progress = progressMap.get(subject.id);
        // Calculate tier passage status
        const easyKey = `${subject.id}-EASY`;
        const mediumKey = `${subject.id}-MEDIUM`;
        const hardKey = `${subject.id}-HARD`;
        const expertKey = `${subject.id}-EXPERT`;
        const easyPassed = scoresBySubjectDifficulty.get(easyKey)?.passed || false;
        const mediumPassed = scoresBySubjectDifficulty.get(mediumKey)?.passed || false;
        const hardPassed = scoresBySubjectDifficulty.get(hardKey)?.passed || false;
        const expertPassed = scoresBySubjectDifficulty.get(expertKey)?.passed || false;
        // Calculate progress as tiers completed
        const tiersCompleted = [easyPassed, mediumPassed, hardPassed, expertPassed]
            .filter(Boolean).length;
        const totalTiers = 4;
        const progressPercentage = (tiersCompleted / totalTiers) * 100;
        // Determine current tier (highest unlocked tier)
        let currentTier = "EASY";
        if (expertPassed)
            currentTier = "EXPERT";
        else if (hardPassed)
            currentTier = "HARD";
        else if (mediumPassed)
            currentTier = "MEDIUM";
        // Determine next unlock
        let nextUnlock = null;
        if (!mediumPassed && easyPassed)
            nextUnlock = "MEDIUM";
        else if (!hardPassed && mediumPassed)
            nextUnlock = "HARD";
        else if (!expertPassed && hardPassed)
            nextUnlock = "EXPERT";
        // Count available exams in current tier
        // Only count exams that:
        // - Are in the current difficulty tier
        // - Have NOT been completed (status is not COMPLETED/ARCHIVED/CANCELLED/DRAFT)
        // - Have started (startsAt is null or in the past)
        // - If endsAt exists, the exam hasn't ended yet
        const now = new Date();
        const examsAvailable = subject.exams.filter((exam) => {
            // Only count current difficulty tier exams
            if (exam.difficulty !== currentTier)
                return false;
            // Skip archived/draft/cancelled/completed exams
            if (["ARCHIVED", "CANCELLED", "DRAFT", "COMPLETED"].includes(exam.status))
                return false;
            // Check if exam has started (startsAt is null or in the past)
            const startsAt = exam.startsAt ? new Date(exam.startsAt) : null;
            if (startsAt && startsAt > now)
                return false;
            // Check if exam has ended (endsAt exists and is in the past)
            const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;
            if (endsAt && endsAt <= now)
                return false;
            return true;
        }).length;
        // Determine status
        // - COMPLETED: All 4 tiers passed
        // - STAND_BY: Has started (passed EASY) but no exams available in current tier
        // - IN_PROGRESS: Has passed some tiers but has exams available
        // - LOCKED: Hasn't passed EASY yet (tied to subject enrollment)
        let status = "IN_PROGRESS";
        if (easyPassed &&
            mediumPassed &&
            hardPassed &&
            expertPassed) {
            status = "COMPLETED";
        }
        else if ((easyPassed ||
            mediumPassed ||
            hardPassed ||
            expertPassed) &&
            examsAvailable === 0) {
            // Student has passed at least one tier but there are no exams available
            status = "STAND_BY";
        }
        return {
            id: subject.id,
            slug: subject.slug,
            name: subject.name,
            code: subject.code,
            progress: Math.round(progressPercentage),
            currentTier,
            nextUnlock,
            examsAvailable,
            status,
            easyPassed,
            mediumPassed,
            hardPassed,
            expertPassed,
        };
    });
    // Calculate dashboard stats
    const totalSubjects = subjectCards.length;
    const completedSubjects = subjectCards.filter((s) => s.status === "COMPLETED").length;
    const activeSubjects = subjectCards.filter((s) => (s.status === "IN_PROGRESS" || s.status === "STAND_BY") &&
        (s.easyPassed ||
            scoresBySubjectDifficulty.has(`${s.id}-EASY`))).length;
    const overallProgress = totalSubjects > 0
        ? Math.round((completedSubjects / totalSubjects) * 100)
        : 0;
    const stats = {
        totalSubjects,
        activeSubjects,
        completedSubjects,
        overallProgress,
    };
    return {
        stats,
        subjects: subjectCards,
    };
};
exports.getStudentDashboard = getStudentDashboard;
/**
 * Get high scores for a student in a specific subject and difficulty
 */
const getHighestScore = async (studentId, subjectId, difficulty) => {
    const attempt = await prisma.examAttempt.findFirst({
        where: {
            studentId,
            exam: {
                subjectId,
                difficulty,
                isArchived: false,
            },
        },
        orderBy: { score: "desc" },
        select: { score: true },
    });
    return attempt?.score ?? null;
};
exports.getHighestScore = getHighestScore;
/**
 * Check if a student has passed a difficulty tier
 */
const hasPassed = async (studentId, subjectId, difficulty) => {
    // Get the passing threshold for this difficulty
    const threshold = await prisma.difficultyThreshold.findUnique({
        where: {
            subjectId_difficulty: { subjectId, difficulty },
        },
        select: { passingScore: true },
    });
    const passingScore = threshold?.passingScore || 75;
    // Get highest score in this difficulty
    const highestScore = await (0, exports.getHighestScore)(studentId, subjectId, difficulty);
    return highestScore !== null && highestScore >= passingScore;
};
exports.hasPassed = hasPassed;
;
