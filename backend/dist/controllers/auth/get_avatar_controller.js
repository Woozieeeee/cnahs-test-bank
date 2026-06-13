"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatarController = void 0;
const upload_avatar_service_1 = require("../../services/auth/upload_avatar_service");
const getAvatarController = async (req, res) => {
    try {
        const avatar = await (0, upload_avatar_service_1.getAvatarService)(req.user.id);
        if (!avatar) {
            return res.status(404).json({
                message: "Avatar not found",
            });
        }
        res.setHeader("Content-Type", avatar.mimeType);
        res.setHeader("Cache-Control", "private, max-age=3600");
        return res.status(200).send(avatar.buffer);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch avatar",
        });
    }
};
exports.getAvatarController = getAvatarController;
