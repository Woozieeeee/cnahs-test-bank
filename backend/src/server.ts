import app from "./app";
import { startExamReminderScheduler } from "./utils/exam_reminder_scheduler";
import { startExamStatusScheduler } from "./utils/update_exam_status";

// Use the PORT provided by Render, or default to 5000 for local development
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startExamStatusScheduler();
  startExamReminderScheduler();
});
