"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentRecordsService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const getStudentRecordsService = async () => {
    return prisma_1.default.studentRecord.findMany({
        include: {
            section: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getStudentRecordsService = getStudentRecordsService;
