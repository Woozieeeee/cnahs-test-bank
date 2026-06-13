"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction ? true : false,
        sameSite: isProduction ? "strict" : "lax",
        path: "/",
    });
    return res.status(200).json({
        message: "Logged out successfully",
    });
};
exports.logout = logout;
