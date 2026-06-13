"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExamStatuses = updateExamStatuses;
exports.startExamStatusScheduler = startExamStatusScheduler;
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Update exam statuses based on current time
 * - SCHEDULED -> ONGOING when startsAt has passed
 * - ONGOING -> COMPLETED when endsAt has passed
 */
async function updateExamStatuses() {
    try {
        const now = new Date();
        // Update exams that should be ONGOING (started but still SCHEDULED)
        const ongoingResult = await prisma_1.default.exam.updateMany({
            where: {
                status: "SCHEDULED",
                startsAt: { lte: now },
                OR: [
                    { endsAt: null },
                    { endsAt: { gt: now } },
                ],
            },
            data: {
                status: "ONGOING",
                updatedAt: now,
            },
        });
        // Update exams that should be COMPLETED (ended but still ONGOING or SCHEDULED)
        const completedResult = await prisma_1.default.exam.updateMany({
            where: {
                status: { in: ["ONGOING", "SCHEDULED"] },
                endsAt: { lte: now },
            },
            data: {
                status: "COMPLETED",
                updatedAt: now,
            },
        });
        if (ongoingResult.count > 0 || completedResult.count > 0) {
            console.log(`[${now.toISOString()}] Exam status updates:`);
            if (ongoingResult.count > 0)
                console.log(`  - Started ${ongoingResult.count} exam(s)`);
            if (completedResult.count > 0)
                console.log(`  - Completed ${completedResult.count} exam(s)`);
        }
    }
    catch (error) {
        console.error("Error updating exam statuses:", error);
    }
}
/**
 * Start the exam status update scheduler
 * Checks every 60 seconds for exams that need status updates
 */
function startExamStatusScheduler() {
    console.log("Exam status scheduler started - checking every 60 seconds");
    // Run immediately on startup
    updateExamStatuses();
    // Then run every 60 seconds
    setInterval(updateExamStatuses, 60 * 1000);
}
