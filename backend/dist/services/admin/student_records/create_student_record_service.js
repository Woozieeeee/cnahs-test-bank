"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentRecordService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const createStudentRecordService = async ({ studentId, firstName, middleName, lastName, suffix, program, }) => {
    const existingRecord = await prisma_1.default.studentRecord.findUnique({
        where: {
            studentId,
        },
    });
    if (existingRecord) {
        throw new Error("Student record already exists.");
    }
    return prisma_1.default.studentRecord.create({
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
exports.createStudentRecordService = createStudentRecordService;
