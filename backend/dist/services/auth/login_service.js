"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginService = async ({ identifier, password }) => {
    // =========================
    // FIND USER
    // =========================
    const user = await prisma_1.default.user.findFirst({
        where: {
            OR: [
                {
                    studentId: identifier,
                },
                {
                    username: identifier,
                },
            ],
        },
    });
    // =========================
    // USER NOT FOUND
    // =========================
    if (!user) {
        throw new Error("Invalid credentials");
    }
    // =========================
    // CHECK PASSWORD
    // =========================
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }
    // =========================
    // CHECK ACCOUNT STATUS
    // =========================
    if (user.status === "PENDING") {
        throw new Error("Account pending approval");
    }
    if (user.status === "REJECTED") {
        throw new Error("Account rejected");
    }
    if (user.status === "DISABLED") {
        throw new Error("Account disabled");
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user.id,
    }, process.env.JWT_SECRET, {
        expiresIn: "12h",
    });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            role: user.role,
            status: user.status,
            isFirstLogin: user.isFirstLogin,
            mustChangePassword: user.role !== "STUDENT" && user.isFirstLogin,
        },
    };
};
exports.loginService = loginService;
