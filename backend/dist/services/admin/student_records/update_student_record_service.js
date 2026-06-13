"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentRecordService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const updateStudentRecordService = async ({ id, studentId, firstName, middleName, lastName, suffix, program, }) => {
    const existingRecord = await prisma_1.default.studentRecord.findFirst({
        where: {
            studentId,
            NOT: {
                id,
            },
        },
    });
    if (existingRecord) {
        throw new Error("Student ID already exists.");
    }
    return prisma_1.default.studentRecord.update({
        where: {
            id,
        },
        data: {
            studentId,
            firstName,
            middleName,
            lastName,
            suffix,
            program,
        },
    });
};
exports.updateStudentRecordService = updateStudentRecordService;
