"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentRegistrations = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getRecentRegistrations = async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany({
            where: {
                role: "STUDENT",
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
            select: {
                id: true,
                name: true,
                studentId: true,
                status: true,
                createdAt: true,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getRecentRegistrations = getRecentRegistrations;
