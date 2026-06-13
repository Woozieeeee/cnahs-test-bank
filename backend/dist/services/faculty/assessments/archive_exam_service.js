"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveExamService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const archiveExamService = async (examId) => {
    const exam = await prisma_1.default.exam.findUnique({
        where: { id: examId },
        select: { status: true },
    });
    if (!exam) {
        throw new Error("Exam not found.");
    }
    if (exam.status === "ONGOING") {
        throw new Error("Cannot archive an ongoing exam. Please wait until the exam is completed.");
    }
    if (exam.status === "DRAFT") {
        throw new Error("Cannot archive a draft exam. Please delete it instead.");
    }
    if (exam.status === "ARCHIVED") {
        throw new Error("Exam is already archived.");
    }
    const updatedExam = await prisma_1.default.exam.update({
        where: { id: examId },
        data: { status: "ARCHIVED" },
    });
    return updatedExam;
};
exports.archiveExamService = archiveExamService;
