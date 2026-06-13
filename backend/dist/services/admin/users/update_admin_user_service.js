"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminUserService = updateAdminUserService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const password_policy_1 = require("../../../lib/password_policy");
const ALLOWED_STATUSES = new Set([
    "PENDING",
    "APPROVED",
    "REJECTED",
    "DISABLED",
]);
async function updateAdminUserService({ userId, name, username, status, password, }) {
    const user = await prisma_1.default.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            username: true,
            studentId: true,
            role: true,
            status: true,
            createdAt: true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const data = {};
    if (name !== undefined) {
        const trimmed = name.trim();
        if (!trimmed)
            throw new Error("Name is required");
        data.name = trimmed;
    }
    if (username !== undefined) {
        if (user.role === "STUDENT") {
            throw new Error("Student usernames cannot be changed");
        }
        const trimmed = username.trim();
        if (!trimmed)
            throw new Error("Username is required");
        const existing = await prisma_1.default.user.findFirst({
            where: {
                username: trimmed,
                NOT: { id: userId },
            },
        });
        if (existing) {
            throw new Error("Username already exists");
        }
        data.username = trimmed;
    }
    if (status !== undefined) {
        if (!ALLOWED_STATUSES.has(status)) {
            throw new Error("Invalid account status");
        }
        if (user.role === "ADMIN" && status !== "APPROVED") {
            throw new Error("Admin accounts cannot be disabled or rejected");
        }
        data.status = status;
    }
    if (password !== undefined) {
        const trimmed = password.trim();
        if (!(0, password_policy_1.isPasswordStrong)(trimmed)) {
            throw new Error("Password must be at least 8 characters and include uppercase, lowercase, number, and special character");
        }
        data.password = await bcrypt_1.default.hash(trimmed, 10);
        data.isFirstLogin = false;
    }
    if (Object.keys(data).length === 0) {
        throw new Error("No changes provided");
    }
    return prisma_1.default.user.update({
        where: { id: userId },
        data,
        select: {
            id: true,
            name: true,
            username: true,
            studentId: true,
            role: true,
            status: true,
            createdAt: true,
        },
    });
}
