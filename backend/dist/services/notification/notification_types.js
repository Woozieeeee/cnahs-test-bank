"use strict";
/**
 * Notification Types for Role-Based System
 * Defines all notification types and their metadata structure
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    // ============ STUDENT NOTIFICATIONS ============
    NotificationType["EXAM_SCHEDULED"] = "EXAM_SCHEDULED";
    NotificationType["EXAM_STARTING_SOON"] = "EXAM_STARTING_SOON";
    NotificationType["EXAM_COMPLETED"] = "EXAM_COMPLETED";
    NotificationType["EXAM_RESULT_PUBLISHED"] = "EXAM_RESULT_PUBLISHED";
    NotificationType["EXAM_ATTEMPT_FLAGGED"] = "EXAM_ATTEMPT_FLAGGED";
    NotificationType["PROGRESS_MILESTONE"] = "PROGRESS_MILESTONE";
    NotificationType["DEADLINE_REMINDER"] = "DEADLINE_REMINDER";
    NotificationType["NEW_SUBJECT_ENROLLED"] = "NEW_SUBJECT_ENROLLED";
    NotificationType["LOW_PERFORMANCE_ALERT"] = "LOW_PERFORMANCE_ALERT";
    NotificationType["DIFFICULTY_LEVEL_UNLOCK"] = "DIFFICULTY_LEVEL_UNLOCK";
    NotificationType["ACCOUNT_APPROVED"] = "ACCOUNT_APPROVED";
    NotificationType["EXAM_NOTIFICATION"] = "EXAM_NOTIFICATION";
    NotificationType["EXAM_ANNOUNCEMENT"] = "EXAM_ANNOUNCEMENT";
    // ============ FACULTY NOTIFICATIONS ============
    NotificationType["EXAM_CREATED"] = "EXAM_CREATED";
    NotificationType["EXAM_PUBLISHED"] = "EXAM_PUBLISHED";
    NotificationType["EXAM_STARTED"] = "EXAM_STARTED";
    NotificationType["EXAM_COMPLETED_FACULTY"] = "EXAM_COMPLETED_FACULTY";
    NotificationType["STUDENT_SUBMISSION_RECEIVED"] = "STUDENT_SUBMISSION_RECEIVED";
    NotificationType["VIOLATION_DETECTED"] = "VIOLATION_DETECTED";
    NotificationType["QUESTION_BATCH_IMPORTED"] = "QUESTION_BATCH_IMPORTED";
    NotificationType["EXAM_PERFORMANCE_SUMMARY"] = "EXAM_PERFORMANCE_SUMMARY";
    NotificationType["NEW_QUESTION_IMPORT_REQUEST"] = "NEW_QUESTION_IMPORT_REQUEST";
    NotificationType["STUDENT_PERFORMANCE_ALERT"] = "STUDENT_PERFORMANCE_ALERT";
    // ============ ADMIN NOTIFICATIONS ============
    NotificationType["SYSTEM_ALERT"] = "SYSTEM_ALERT";
    NotificationType["USER_ACCOUNT_CREATED"] = "USER_ACCOUNT_CREATED";
    NotificationType["USER_ACCOUNT_STATUS_CHANGED"] = "USER_ACCOUNT_STATUS_CHANGED";
    NotificationType["EXAM_VIOLATION_ESCALATION"] = "EXAM_VIOLATION_ESCALATION";
    NotificationType["BULK_IMPORT_COMPLETED"] = "BULK_IMPORT_COMPLETED";
    NotificationType["SYSTEM_ERROR_LOGGED"] = "SYSTEM_ERROR_LOGGED";
    NotificationType["SUSPICIOUS_ACTIVITY_DETECTED"] = "SUSPICIOUS_ACTIVITY_DETECTED";
    NotificationType["DATABASE_BACKUP_COMPLETED"] = "DATABASE_BACKUP_COMPLETED";
    NotificationType["SECURITY_ALERT"] = "SECURITY_ALERT";
    NotificationType["USER_APPROVAL_REQUIRED"] = "USER_APPROVAL_REQUIRED";
    NotificationType["PASSWORD_RESET_REQUEST"] = "PASSWORD_RESET_REQUEST";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
