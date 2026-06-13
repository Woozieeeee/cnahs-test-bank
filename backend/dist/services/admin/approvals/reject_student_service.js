"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectStudentService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const rejectStudentService = async (id, adminName) => {
    const student = await prisma_1.default.user.update({
        where: {
            id,
        },
        data: {
            status: "REJECTED",
        },
    });
    return student;
};
exports.rejectStudentService = rejectStudentService;
