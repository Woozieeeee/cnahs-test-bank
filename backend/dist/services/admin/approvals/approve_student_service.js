"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveStudentService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const notification_service_1 = require("../../notification/notification_service");
const admin_notification_handler_1 = require("../../notification/admin_notification_handler");
const notification_types_1 = require("../../notification/notification_types");
const approveStudentService = async (id, adminName) => {
    const existing = await prisma_1.default.user.findUnique({ where: { id } });
    if (!existing) {
        throw new Error("Student not found");
    }
    const student = await prisma_1.default.user.update({
        where: { id },
        data: {
            status: "APPROVED",
        },
    });
    void notification_service_1.notificationService
        .createNotification(student.id, {
        type: notification_types_1.NotificationType.ACCOUNT_APPROVED,
        title: "Account Approved",
        message: "Your student account has been approved. You can now access exams and course materials.",
        metadata: {
            priority: "HIGH",
            actionUrl: "/student/dashboard",
        },
    })
        .catch((error) => {
        console.error("Failed to notify student of approval:", error);
    });
    void admin_notification_handler_1.adminNotificationHandler
        .notifyUserAccountStatusChanged(student.id, existing.status, student.status, adminName ? `Approved by ${adminName}` : "Approved")
        .catch((error) => {
        console.error("Failed to notify admins of approval:", error);
    });
    return student;
};
exports.approveStudentService = approveStudentService;
