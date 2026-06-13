"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackStatus = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const trackStatus = async (req, res) => {
    try {
        const studentId = String(req.params.studentId);
        const user = await prisma_1.default.user.findUnique({
            where: {
                studentId,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "Student not found",
            });
        }
        return res.status(200).json({
            status: user.status,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.trackStatus = trackStatus;
