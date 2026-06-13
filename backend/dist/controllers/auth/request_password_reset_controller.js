"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPasswordResetController = void 0;
const request_password_reset_service_1 = require("../../services/auth/request_password_reset_service");
const requestPasswordResetController = async (req, res) => {
    try {
        const identifier = String(req.body?.identifier ?? "");
        await (0, request_password_reset_service_1.requestPasswordResetService)(identifier);
        return res.status(200).json({
            message: "Your password change request has been sent to the administrator. Kindly visit the Dean's Office for further assistance.",
        });
    }
    catch (error) {
        console.error("Password reset request failed:", error);
        return res.status(200).json({
            message: "Your password change request has been sent to the administrator. Kindly visit the Dean's Office for further assistance.",
        });
    }
};
exports.requestPasswordResetController = requestPasswordResetController;
