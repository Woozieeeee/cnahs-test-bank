"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const authMiddleware = async (req, res, next) => {
    try {
        // =========================
        // GET TOKEN FROM COOKIE
        // =========================
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }
        // =========================
        // VERIFY TOKEN
        // =========================
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // =========================
        // FIND USER
        // =========================
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });
        if (!user) {
            res.status(401).json({
                message: "User not found",
            });
            return;
        }
        // =========================
        // ATTACH USER
        // =========================
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "Invalid token",
        });
        return;
    }
};
exports.authMiddleware = authMiddleware;
