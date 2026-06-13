"use strict";
/**
 * Notification Service Index
 * Exports all notification handlers for easy access
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminNotificationTemplates = exports.FacultyNotificationTemplates = exports.StudentNotificationTemplates = exports.NotificationType = exports.AdminNotificationHandler = exports.adminNotificationHandler = exports.FacultyNotificationHandler = exports.facultyNotificationHandler = exports.StudentNotificationHandler = exports.studentNotificationHandler = exports.NotificationService = exports.notificationService = void 0;
var notification_service_1 = require("./notification_service");
Object.defineProperty(exports, "notificationService", { enumerable: true, get: function () { return notification_service_1.notificationService; } });
Object.defineProperty(exports, "NotificationService", { enumerable: true, get: function () { return notification_service_1.NotificationService; } });
var student_notification_handler_1 = require("./student_notification_handler");
Object.defineProperty(exports, "studentNotificationHandler", { enumerable: true, get: function () { return student_notification_handler_1.studentNotificationHandler; } });
Object.defineProperty(exports, "StudentNotificationHandler", { enumerable: true, get: function () { return student_notification_handler_1.StudentNotificationHandler; } });
var faculty_notification_handler_1 = require("./faculty_notification_handler");
Object.defineProperty(exports, "facultyNotificationHandler", { enumerable: true, get: function () { return faculty_notification_handler_1.facultyNotificationHandler; } });
Object.defineProperty(exports, "FacultyNotificationHandler", { enumerable: true, get: function () { return faculty_notification_handler_1.FacultyNotificationHandler; } });
var admin_notification_handler_1 = require("./admin_notification_handler");
Object.defineProperty(exports, "adminNotificationHandler", { enumerable: true, get: function () { return admin_notification_handler_1.adminNotificationHandler; } });
Object.defineProperty(exports, "AdminNotificationHandler", { enumerable: true, get: function () { return admin_notification_handler_1.AdminNotificationHandler; } });
var notification_types_1 = require("./notification_types");
Object.defineProperty(exports, "NotificationType", { enumerable: true, get: function () { return notification_types_1.NotificationType; } });
var notification_templates_1 = require("./notification_templates");
Object.defineProperty(exports, "StudentNotificationTemplates", { enumerable: true, get: function () { return notification_templates_1.StudentNotificationTemplates; } });
Object.defineProperty(exports, "FacultyNotificationTemplates", { enumerable: true, get: function () { return notification_templates_1.FacultyNotificationTemplates; } });
Object.defineProperty(exports, "AdminNotificationTemplates", { enumerable: true, get: function () { return notification_templates_1.AdminNotificationTemplates; } });
