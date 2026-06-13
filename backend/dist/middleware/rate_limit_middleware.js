"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetRateLimiter = exports.loginRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const prisma_1 = __importDefault(require("../lib/prisma"));
exports.loginRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    handler: async (req, res, next) => {
        const { identifier } = req.body;
        try {
            // Check if the identifier belongs to admin or faculty
            const user = await prisma_1.default.user.findFirst({
                where: {
                    OR: [{ studentId: identifier }, { username: identifier }],
                },
                select: {
                    role: true,
                },
            });
            // Allow admin and faculty to bypass rate limit
            if (user && (user.role === "ADMIN" || user.role === "FACULTY")) {
                return next();
            }
        }
        catch {
            // If check fails, proceed with rate limit
        }
        const resetTime = req.rateLimit?.resetTime;
        const remainingTime = resetTime
            ? Math.ceil((resetTime.getTime() - Date.now()) / 1000)
            : 900;
        res.status(429).json({
            message: "Too many login attempts. Please try again later.",
            remainingTime,
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.passwordResetRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 3,
    handler: (req, res) => {
        const resetTime = req.rateLimit?.resetTime;
        const remainingTime = resetTime
            ? Math.ceil((resetTime.getTime() - Date.now()) / 1000)
            : 900;
        res.status(429).json({
            message: "Too many password reset requests. Please try again later.",
            remainingTime,
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
});
