"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const comparePassword_1 = require("../utils/comparePassword");
const generateToken_1 = require("../utils/generateToken");
const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        // =========================
        // VALIDATION
        // =========================
        if (!login || !password) {
            return res.status(400).json({
                message: "Login and password required",
            });
        }
        // =========================
        // FIND USER
        // =========================
        const user = await prisma_1.default.user.findFirst({
            where: {
                OR: [
                    {
                        username: login,
                    },
                    {
                        studentId: login,
                    },
                ],
            },
        });
        // =========================
        // USER NOT FOUND
        // =========================
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        // =========================
        // ACCOUNT STATUS
        // =========================
        if (user.role === "STUDENT") {
            if (user.status === "PENDING") {
                return res.status(403).json({
                    message: "Your account is still waiting for administrator approval. Please try again later.",
                });
            }
            if (user.status === "REJECTED") {
                return res.status(403).json({
                    message: "Your registration request was rejected. Please contact the administrator.",
                });
            }
        }
        // =========================
        // PASSWORD CHECK
        // =========================
        const isMatch = await (0, comparePassword_1.comparePassword)(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        // =========================
        // GENERATE TOKEN
        // =========================
        const token = (0, generateToken_1.generateToken)(user.id);
        // =========================
        // COOKIE
        // =========================
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 *
                24 *
                60 *
                60 *
                1000,
        });
        // =========================
        // SAFE RESPONSE
        // =========================
        res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                role: user.role,
                status: user.status,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.login = login;
