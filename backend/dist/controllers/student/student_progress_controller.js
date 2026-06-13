"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgressController = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const getProgressController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Get user's section
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            include: { section: true },
        });
        if (!user || !user.sectionId) {
            res.status(200).json({
                data: {
                    totalSubjects: 0,
                    completedSubjects: 0,
                    activeSubjects: 0,
                    overallProgress: 0,
                    averageScore: 0,
                    subjects: [],
                    tierStats: [
                        { tier: "EASY", completed: 0, inProgress: 0, locked: 0, totalAttempts: 0, averageScore: 0 },
                        { tier: "MEDIUM", completed: 0, inProgress: 0, locked: 0, totalAttempts: 0, averageScore: 0 },
                        { tier: "HARD", completed: 0, inProgress: 0, locked: 0, totalAttempts: 0, averageScore: 0 },
                        { tier: "EXPERT", completed: 0, inProgress: 0, locked: 0, totalAttempts: 0, averageScore: 0 },
                    ],
                },
            });
            return;
        }
        // Get all subjects for the user's section
        const sectionSubjects = await prisma_1.default.sectionSubject.findMany({
            where: { sectionId: user.sectionId },
            include: { subject: true },
        });
        if (sectionSubjects.length === 0) {
            res.status(200).json({
                data: {
                    totalSubjects: 0,
                    completedSubjects: 0,
                    activeSubjects: 0,
                    overallProgress: 0,
                    averageScore: 0,
                    subjects: [],
                    tierStats: [
                        { tier: "EASY", completed: 0, inProgress: 0, locked: 0, totalAttempts: 0, averageScore: 0 },
                        { tier: "MEDIUM", completed: 0, inProgress: 0, locked: 0, totalAttempts: 0, averageScore: 0 },
                        { tier: "HARD", completed: 0, inProgress: 0, locked: 0, totalAttempts: 0, averageScore: 0 },
                        { tier: "EXPERT", completed: 0, inProgress: 0, locked: 0, totalAttempts: 0, averageScore: 0 },
                    ],
                },
            });
            return;
        }
        const subjectIds = sectionSubjects.map((ss) => ss.subjectId);
        // Get all exams for these subjects
        const exams = await prisma_1.default.exam.findMany({
            where: { subjectId: { in: subjectIds } },
            include: {
                attempts: {
                    where: { studentId: userId },
                },
            },
        });
        // Calculate subject progress
        const subjectProgress = sectionSubjects.map((ss) => {
            const subjectExams = exams.filter((e) => e.subjectId === ss.subjectId);
            const passedTiers = {
                EASY: subjectExams.some((e) => e.difficulty === "EASY" &&
                    e.attempts.some((ea) => ea.score >= e.passingScore && ea.status === "COMPLETED")),
                MEDIUM: subjectExams.some((e) => e.difficulty === "MEDIUM" &&
                    e.attempts.some((ea) => ea.score >= e.passingScore && ea.status === "COMPLETED")),
                HARD: subjectExams.some((e) => e.difficulty === "HARD" &&
                    e.attempts.some((ea) => ea.score >= e.passingScore && ea.status === "COMPLETED")),
                EXPERT: subjectExams.some((e) => e.difficulty === "EXPERT" &&
                    e.attempts.some((ea) => ea.score >= e.passingScore && ea.status === "COMPLETED")),
            };
            // Calculate tier unlock status
            const tierUnlocked = {
                EASY: true, // EASY is always unlocked
                MEDIUM: passedTiers.EASY,
                HARD: passedTiers.MEDIUM,
                EXPERT: passedTiers.HARD,
            };
            const tiersPassed = Object.values(passedTiers).filter(Boolean).length;
            const progress = Math.round((tiersPassed / 4) * 100);
            // Determine current tier (first unlocked tier)
            let currentTier = "EASY";
            if (passedTiers.EASY)
                currentTier = "MEDIUM";
            if (passedTiers.MEDIUM)
                currentTier = "HARD";
            if (passedTiers.HARD)
                currentTier = "EXPERT";
            // Determine status
            let status = "LOCKED";
            const now = new Date();
            const availableExams = subjectExams.filter((e) => {
                const startsAt = e.startsAt ? new Date(e.startsAt) : null;
                const endsAt = e.endsAt ? new Date(e.endsAt) : null;
                return (!startsAt || startsAt <= now) && (!endsAt || endsAt > now);
            });
            if (availableExams.length > 0)
                status = "IN_PROGRESS";
            if (tiersPassed === 4)
                status = "COMPLETED";
            return {
                id: ss.subject.id,
                slug: ss.subject.slug,
                name: ss.subject.name,
                code: ss.subject.code,
                progress,
                status,
                currentTier,
                easyPassed: passedTiers.EASY,
                mediumPassed: passedTiers.MEDIUM,
                hardPassed: passedTiers.HARD,
                expertPassed: passedTiers.EXPERT,
                easyUnlocked: tierUnlocked.EASY,
                mediumUnlocked: tierUnlocked.MEDIUM,
                hardUnlocked: tierUnlocked.HARD,
                expertUnlocked: tierUnlocked.EXPERT,
            };
        });
        // Calculate tier statistics
        const tiers = ["EASY", "MEDIUM", "HARD", "EXPERT"];
        const tierStats = tiers.map((tier) => {
            const tierExams = exams.filter((e) => e.difficulty === tier);
            const attempts = tierExams.flatMap((e) => e.attempts);
            // Count subjects that have passed this tier
            const completedCount = subjectProgress.filter((s) => s[`${tier.toLowerCase()}Passed`]).length;
            // Count subjects that have this tier unlocked but not passed
            const tiersUnlockedMap = {
                EASY: "easyUnlocked",
                MEDIUM: "mediumUnlocked",
                HARD: "hardUnlocked",
                EXPERT: "expertUnlocked",
            };
            const unlockedButNotPassedCount = subjectProgress.filter((s) => {
                const isUnlocked = s[tiersUnlockedMap[tier]];
                const isPassed = s[`${tier.toLowerCase()}Passed`];
                return isUnlocked && !isPassed;
            }).length;
            // Locked count = subjects where tier is not yet unlocked
            const lockedCount = subjectProgress.length - completedCount - unlockedButNotPassedCount;
            const avgScore = attempts.length > 0 ? attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length : 0;
            return {
                tier,
                completed: completedCount,
                inProgress: unlockedButNotPassedCount,
                locked: Math.max(0, lockedCount),
                totalAttempts: attempts.length,
                averageScore: Math.round(avgScore),
            };
        });
        // Calculate overall stats
        const totalSubjects = subjectProgress.length;
        const completedSubjects = subjectProgress.filter((s) => s.status === "COMPLETED").length;
        const activeSubjects = subjectProgress.filter((s) => s.status === "IN_PROGRESS").length;
        const overallProgress = totalSubjects > 0
            ? Math.round(subjectProgress.reduce((sum, s) => sum + s.progress, 0) / totalSubjects)
            : 0;
        const allAttempts = exams.flatMap((e) => e.attempts);
        const averageScore = allAttempts.length > 0
            ? Math.round(allAttempts.reduce((sum, a) => sum + a.score, 0) / allAttempts.length)
            : 0;
        res.status(200).json({
            data: {
                totalSubjects,
                completedSubjects,
                activeSubjects,
                overallProgress,
                averageScore,
                subjects: subjectProgress,
                tierStats,
            },
        });
    }
    catch (error) {
        console.error("Error fetching progress:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProgressController = getProgressController;
