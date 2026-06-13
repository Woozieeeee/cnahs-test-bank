"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const log_activity_1 = require("../utils/log_activity");
const login_service_1 = require("../services/auth/login_service");
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const { token, user } = await (0, login_service_1.loginService)({
            identifier,
            password,
        });
        // =========================
        // SET COOKIE
        // =========================
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction ? true : false,
            sameSite: isProduction ? "strict" : "lax",
            maxAge: 1000 * 60 * 60 * 24,
            path: "/",
        });
        try {
            await (0, log_activity_1.logActivity)({
                action: "User signed in",
                categories: ["AUTH", "SECURITY", "SYSTEM"],
                severity: "INFO",
                description: `${user.name} signed it successfully.`,
                performedBy: user.name,
            });
        }
        catch (error) {
            console.error("Failed to record login activity:", error);
        }
        return res.json({
            message: "Login successful",
            user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.login = login;
