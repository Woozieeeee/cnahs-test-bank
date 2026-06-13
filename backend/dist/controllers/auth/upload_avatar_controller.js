"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAvatarController = exports.uploadAvatarController = void 0;
const upload_avatar_service_1 = require("../../services/auth/upload_avatar_service");
const uploadAvatarController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Avatar image is required",
            });
        }
        const updatedUser = await (0, upload_avatar_service_1.uploadAvatarService)(req.user.id, req.file.buffer, req.file.mimetype);
        return res.status(200).json({
            message: "Avatar updated successfully",
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                username: updatedUser.username,
                studentId: updatedUser.studentId,
                role: updatedUser.role,
                status: updatedUser.status,
                isFirstLogin: updatedUser.isFirstLogin,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt,
                hasAvatar: true,
            },
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message ?? "Failed to upload avatar",
        });
    }
};
exports.uploadAvatarController = uploadAvatarController;
const deleteAvatarController = async (req, res) => {
    try {
        const updatedUser = await (0, upload_avatar_service_1.deleteAvatarService)(req.user.id);
        return res.status(200).json({
            message: "Avatar removed successfully",
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                username: updatedUser.username,
                studentId: updatedUser.studentId,
                role: updatedUser.role,
                status: updatedUser.status,
                isFirstLogin: updatedUser.isFirstLogin,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt,
                hasAvatar: false,
            },
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message ?? "Failed to remove avatar",
        });
    }
};
exports.deleteAvatarController = deleteAvatarController;
