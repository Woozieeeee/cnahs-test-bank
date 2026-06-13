import { processExamReminders } from "../services/notification/exam_reminder_service";

const REMINDER_CHECK_INTERVAL_MS = 60 * 1000;

export function startExamReminderScheduler() {
  console.log(
    "Exam reminder scheduler started - checking every 60 seconds",
  );

  processExamReminders().catch((error) => {
    console.error("Initial exam reminder check failed:", error);
  });

  setInterval(() => {
    processExamReminders().catch((error) => {
      console.error("Exam reminder check failed:", error);
    });
  }, REMINDER_CHECK_INTERVAL_MS);
}
