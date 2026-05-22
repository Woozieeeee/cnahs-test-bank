"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getMe = async (req, res) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: req.userId,
        },
    });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    const { password, ...safeUser } = user;
    res.json(safeUser);
};
exports.getMe = getMe;
