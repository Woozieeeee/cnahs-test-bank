"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await prisma_1.default.user.count({
            where: {
                role: "STUDENT",
            },
        });
        const pendingAccounts = await prisma_1.default.user.count({
            where: {
                role: "STUDENT",
                status: "PENDING",
            },
        });
        const approvedAccounts = await prisma_1.default.user.count({
            where: {
                role: "STUDENT",
                status: "APPROVED",
            },
        });
        const totalFaculty = await prisma_1.default.user.count({
            where: {
                role: "FACULTY",
            },
        });
        const totalExams = 0;
        res.status(200).json({
            totalStudents,
            pendingAccounts,
            approvedAccounts,
            totalFaculty,
            totalExams,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getDashboardStats = getDashboardStats;
