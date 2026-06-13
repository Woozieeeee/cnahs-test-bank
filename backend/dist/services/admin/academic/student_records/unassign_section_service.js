"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unassignSectionService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const unassignSectionService = async (studentRecordId) => {
    // First, get the student record to get the studentId
    const studentRecord = await prisma_1.default.studentRecord.findUnique({
        where: { id: studentRecordId },
    });
    if (!studentRecord) {
        throw new Error("Student record not found.");
    }
    // Update StudentRecord
    await prisma_1.default.studentRecord.update({
        where: { id: studentRecordId },
        data: { sectionId: null },
    });
    // Update User's sectionId to null
    await prisma_1.default.user.update({
        where: { studentId: studentRecord.studentId },
        data: { sectionId: null },
    });
    return studentRecord;
};
exports.unassignSectionService = unassignSectionService;
