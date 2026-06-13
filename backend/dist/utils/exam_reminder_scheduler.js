"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startExamReminderScheduler = startExamReminderScheduler;
const exam_reminder_service_1 = require("../services/notification/exam_reminder_service");
const REMINDER_CHECK_INTERVAL_MS = 60 * 1000;
function startExamReminderScheduler() {
    console.log("Exam reminder scheduler started - checking every 60 seconds");
    (0, exam_reminder_service_1.processExamReminders)().catch((error) => {
        console.error("Initial exam reminder check failed:", error);
    });
    setInterval(() => {
        (0, exam_reminder_service_1.processExamReminders)().catch((error) => {
            console.error("Exam reminder check failed:", error);
        });
    }, REMINDER_CHECK_INTERVAL_MS);
}
