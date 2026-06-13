"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatarService = exports.deleteAvatarService = exports.uploadAvatarService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const ALLOWED_MIME_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
]);
const MAX_AVATAR_SIZE = 2 * 1024 * 1024;
const uploadAvatarService = async (userId, buffer, mimeType) => {
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
        throw new Error("Only JPEG, PNG, WebP, and GIF images are allowed");
    }
    if (buffer.length > MAX_AVATAR_SIZE) {
        throw new Error("Avatar must be 2MB or smaller");
    }
    const updatedUser = await prisma_1.default.user.update({
        where: { id: userId },
        data: {
            avatar: new Uint8Array(buffer),
            avatarMimeType: mimeType,
        },
    });
    return updatedUser;
};
exports.uploadAvatarService = uploadAvatarService;
const deleteAvatarService = async (userId) => {
    const updatedUser = await prisma_1.default.user.update({
        where: { id: userId },
        data: {
            avatar: null,
            avatarMimeType: null,
        },
    });
    return updatedUser;
};
exports.deleteAvatarService = deleteAvatarService;
const getAvatarService = async (userId) => {
    const user = await prisma_1.default.user.findUnique({
        where: { id: userId },
        select: {
            avatar: true,
            avatarMimeType: true,
        },
    });
    if (!user?.avatar || !user.avatarMimeType) {
        return null;
    }
    return {
        buffer: Buffer.from(user.avatar),
        mimeType: user.avatarMimeType,
    };
};
exports.getAvatarService = getAvatarService;
