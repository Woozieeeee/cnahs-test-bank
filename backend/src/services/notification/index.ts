/**
 * Notification Service Index
 * Exports all notification handlers for easy access
 */

export { notificationService, NotificationService } from "./notification_service";
export { studentNotificationHandler, StudentNotificationHandler } from "./student_notification_handler";
export { facultyNotificationHandler, FacultyNotificationHandler } from "./faculty_notification_handler";
export { adminNotificationHandler, AdminNotificationHandler } from "./admin_notification_handler";
export { NotificationType, NotificationPayload, NotificationMetadata } from "./notification_types";
export {
  StudentNotificationTemplates,
  FacultyNotificationTemplates,
  AdminNotificationTemplates,
} from "./notification_templates";
