"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminUserController = void 0;
const update_admin_user_service_1 = require("../../../services/admin/users/update_admin_user_service");
const updateAdminUserController = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { name, username, status, password } = req.body;
        if (Number.isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = await (0, update_admin_user_service_1.updateAdminUserService)({
            userId,
            name,
            username,
            status,
            password,
        });
        return res.json({
            message: "User updated successfully",
            user,
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update user";
        const statusCode = message === "User not found"
            ? 404
            : message.includes("already exists") ||
                message.includes("cannot") ||
                message.includes("Invalid") ||
                message.includes("required") ||
                message.includes("No changes")
                ? 400
                : 500;
        return res.status(statusCode).json({ message });
    }
};
exports.updateAdminUserController = updateAdminUserController;
