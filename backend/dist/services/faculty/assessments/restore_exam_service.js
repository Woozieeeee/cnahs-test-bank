"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreExamService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const restoreExamService = async (examId) => {
    const exam = await prisma_1.default.exam.findUnique({
        where: { id: examId },
        select: { status: true },
    });
    if (!exam) {
        throw new Error("Exam not found.");
    }
    if (exam.status !== "ARCHIVED" && exam.status !== "CANCELLED") {
        throw new Error("Only archived or cancelled exams can be restored.");
    }
    const updatedExam = await prisma_1.default.exam.update({
        where: { id: examId },
        data: { status: "SCHEDULED" },
    });
    return updatedExam;
};
exports.restoreExamService = restoreExamService;
