"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupCancelledExamsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const cleanupCancelledExamsService = async () => {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const deletedExams = await prisma_1.default.exam.deleteMany({
        where: {
            status: "CANCELLED",
            updatedAt: {
                lt: oneDayAgo,
            },
        },
    });
    return { count: deletedExams.count };
};
exports.cleanupCancelledExamsService = cleanupCancelledExamsService;
