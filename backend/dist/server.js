"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const exam_reminder_scheduler_1 = require("./utils/exam_reminder_scheduler");
const update_exam_status_1 = require("./utils/update_exam_status");
// Use the PORT provided by Render, or default to 5000 for local development
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    (0, update_exam_status_1.startExamStatusScheduler)();
    (0, exam_reminder_scheduler_1.startExamReminderScheduler)();
});
