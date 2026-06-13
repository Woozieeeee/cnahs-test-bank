"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const changePasswordService = async (userId, currentPassword, newPassword) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt_1.default.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new Error("Current password is incorrect");
    }
    const samePassword = await bcrypt_1.default.compare(newPassword, user.password);
    if (samePassword) {
        throw new Error("New password must be different from current password");
    }
    const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
    await prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data: {
            password: hashedPassword,
            isFirstLogin: false,
        },
    });
    return user;
};
exports.changePasswordService = changePasswordService;
