"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPasswordResetService = requestPasswordResetService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const notification_service_1 = require("../notification/notification_service");
const notification_types_1 = require("../notification/notification_types");
const password_reset_request_queue_1 = require("../../utils/password_reset_request_queue");
const REQUEST_COOLDOWN_MS = 24 * 60 * 60 * 1000;
async function notifyAdminsOfPasswordResetRequest(userId, userName, identifier, role) {
    const admins = await prisma_1.default.user.findMany({
        where: { role: "ADMIN", status: "APPROVED" },
        select: { id: true },
    });
    if (admins.length === 0)
        return;
    await notification_service_1.notificationService.createBulkNotifications(admins.map((admin) => admin.id), {
        type: notification_types_1.NotificationType.PASSWORD_RESET_REQUEST,
        title: "Password Reset Request",
        message: `${userName} (${identifier}) requested a password reset. Please coordinate with the Dean's Office.`,
        metadata: {
            userId,
            identifier,
            role,
            timestamp: new Date(),
            actionUrl: "/admin/users",
            priority: "HIGH",
        },
        priority: "HIGH",
    });
}
async function processPasswordResetRequest(identifier) {
    const trimmed = identifier.trim();
    if (!trimmed) {
        return { accepted: true };
    }
    const user = await prisma_1.default.user.findFirst({
        where: {
            OR: [{ studentId: trimmed }, { username: trimmed }],
        },
        select: {
            id: true,
            name: true,
            role: true,
            status: true,
            studentId: true,
            username: true,
        },
    });
    if (!user) {
        return { accepted: true };
    }
    if (user.status === "REJECTED" || user.status === "DISABLED") {
        return { accepted: true };
    }
    const cooldownSince = new Date(Date.now() - REQUEST_COOLDOWN_MS);
    const existingRequest = await prisma_1.default.passwordResetRequest.findFirst({
        where: {
            userId: user.id,
            status: "PENDING",
            createdAt: { gte: cooldownSince },
        },
        orderBy: { createdAt: "desc" },
    });
    if (existingRequest) {
        return { accepted: true };
    }
    await prisma_1.default.passwordResetRequest.create({
        data: {
            userId: user.id,
            identifier: trimmed,
            status: "PENDING",
        },
    });
    const displayIdentifier = user.studentId || user.username || trimmed;
    await notifyAdminsOfPasswordResetRequest(user.id, user.name, displayIdentifier, user.role);
    return { accepted: true };
}
async function requestPasswordResetService(identifier) {
    return password_reset_request_queue_1.passwordResetRequestQueue.enqueue(() => processPasswordResetRequest(identifier));
}
