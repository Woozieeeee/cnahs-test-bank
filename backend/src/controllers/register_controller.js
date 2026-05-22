"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const hashPassword_1 = require("../utils/hashPassword");
const register = async (req, res) => {
    try {
        const { name, studentId, password, } = req.body;
        // =========================
        // VALIDATE STUDENT ID
        // =========================
        const studentIdRegex = /^\d{2}-\d{5}$/;
        if (!studentId) {
            return res.status(400).json({
                message: "Student ID required",
            });
        }
        if (!studentIdRegex.test(studentId)) {
            return res.status(400).json({
                message: "Invalid student ID format",
            });
        }
        // =========================
        // CHECK EXISTING USER
        // =========================
        const existingUser = await prisma_1.default.user.findUnique({
            where: {
                studentId,
            },
        });
        if (existingUser) {
            return res.status(400).json({
                message: "Student already exists",
            });
        }
        // =========================
        // HASH PASSWORD
        // =========================
        const hashedPassword = await (0, hashPassword_1.hashPassword)(password);
        // =========================
        // CREATE USER
        // =========================
        const user = await prisma_1.default.user.create({
            data: {
                name,
                studentId,
                password: hashedPassword,
                role: "STUDENT",
                status: "PENDING",
            },
        });
        // =========================
        // SAFE RESPONSE
        // =========================
        res.status(201).json({
            message: "Registration submitted successfully",
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
exports.register = register;
