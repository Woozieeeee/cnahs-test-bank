"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectStudent = exports.approveStudent = exports.getPendingStudents = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// =========================
// GET PENDING STUDENTS
// =========================
const getPendingStudents = async (req, res) => {
    try {
        const students = await prisma_1.default.user.findMany({
            where: {
                role: "STUDENT",
                status: "PENDING",
            },
            select: {
                id: true,
                name: true,
                studentId: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json(students);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getPendingStudents = getPendingStudents;
// =========================
// APPROVE STUDENT
// =========================
const approveStudent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma_1.default.user.update({
            where: {
                id,
            },
            data: {
                status: "APPROVED",
            },
        });
        res.status(200).json({
            message: "Student approved successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.approveStudent = approveStudent;
// =========================
// REJECT STUDENT
// =========================
const rejectStudent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma_1.default.user.update({
            where: {
                id,
            },
            data: {
                status: "REJECTED",
            },
        });
        res.status(200).json({
            message: "Student rejected successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.rejectStudent = rejectStudent;
