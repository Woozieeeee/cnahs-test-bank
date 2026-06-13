"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileController = void 0;
const update_profile_service_1 = require("../../services/auth/update_profile_service");
const updateProfileController = async (req, res) => {
    try {
        const { name, username } = req.body;
        const updatedUser = await (0, update_profile_service_1.updateProfileService)(req.user.id, {
            name,
            username,
        });
        return res.status(200).json({
            message: "Profile updated successfully",
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
                hasAvatar: !!updatedUser.avatar,
            },
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message ?? "Failed to update profile",
        });
    }
};
exports.updateProfileController = updateProfileController;
