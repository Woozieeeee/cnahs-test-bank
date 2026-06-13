"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignSectionService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const assignSectionService = async ({ studentRecordId, sectionId, }) => {
    // First, update StudentRecord
    const studentRecord = await prisma_1.default.studentRecord.update({
        where: {
            id: studentRecordId,
        },
        data: {
            sectionId,
        },
        include: {
            section: true,
        },
    });
    // Then, update the associated User's sectionId
    // Note: user.sectionId links to Section.id directly
    await prisma_1.default.user.update({
        where: {
            studentId: studentRecord.studentId,
        },
        data: {
            sectionId,
        },
    });
    return studentRecord;
};
exports.assignSectionService = assignSectionService;
