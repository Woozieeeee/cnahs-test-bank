"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPendingStudentsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getPendingStudentsService = async () => {
    return prisma_1.default.user.findMany({
        where: {
            role: "STUDENT",
            status: "PENDING",
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getPendingStudentsService = getPendingStudentsService;
