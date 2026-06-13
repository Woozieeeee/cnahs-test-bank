"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const changePasswordService = async (data) => {
    try {
        const { userId, currentPassword, newPassword } = data;
        // Validate passwords
        if (!currentPassword || !newPassword) {
            throw new Error("Current password and new password are required");
        }
        if (currentPassword === newPassword) {
            throw new Error("New password must be different from current password");
        }
        if (newPassword.length < 8) {
            throw new Error("New password must be at least 8 characters long");
        }
        // Fetch user
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            select: { id: true, password: true, username: true },
        });
        if (!user) {
            throw new Error("User not found");
        }
        // Verify current password
        const passwordMatches = await bcrypt_1.default.compare(currentPassword, user.password);
        if (!passwordMatches) {
            throw new Error("Current password is incorrect");
        }
        // Hash new password
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        // Update password
        await prisma_1.default.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
                updatedAt: new Date(),
            },
        });
        console.log(`[PasswordService] Password changed for user: ${user.username}`);
        return { success: true, message: "Password changed successfully" };
    }
    catch (error) {
        console.error("[PasswordService] Error changing password:", error);
        throw error;
    }
};
exports.changePasswordService = changePasswordService;
