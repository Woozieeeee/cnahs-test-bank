"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveViolationService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const resolveViolationService = async (violationId, resolvedBy, notes) => {
    const violation = await prisma_1.default.examViolation.findUnique({
        where: { id: violationId },
    });
    if (!violation) {
        throw new Error("Violation not found");
    }
    const updated = await prisma_1.default.examViolation.update({
        where: { id: violationId },
        data: {
            resolved: true,
            resolvedAt: new Date(),
            resolvedBy,
            description: notes
                ? `${violation.description || ""}\n[Admin Notes]: ${notes}`
                : violation.description,
        },
        include: {
            student: {
                select: {
                    id: true,
                    name: true,
                    studentId: true,
                },
            },
            exam: {
                select: {
                    id: true,
                    title: true,
                    examCode: true,
                },
            },
        },
    });
    return updated;
};
exports.resolveViolationService = resolveViolationService;
