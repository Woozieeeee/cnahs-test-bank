import app from "./app";
import { startExamReminderScheduler } from "./utils/exam_reminder_scheduler";
import { startExamStatusScheduler } from "./utils/update_exam_status";

// Uncaught exceptions - synchronous errors (like undefined variables)
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

// Use the PORT provided by Render, or default to 5000 for local development
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startExamStatusScheduler();
  startExamReminderScheduler();
});

// Unhandled rejections - asynchronous errors (like failed database connections)
process.on("unhandledRejection", (err: any) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});
