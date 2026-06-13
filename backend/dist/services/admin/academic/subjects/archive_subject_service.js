"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveSubjectService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const archiveSubjectService = async (id) => {
    const subject = await prisma_1.default.subject.findUnique({
        where: { id },
    });
    if (!subject) {
        throw new Error("Subject not found");
    }
    return prisma_1.default.subject.update({
        where: { id },
        data: {
            isArchived: true,
        },
    });
};
exports.archiveSubjectService = archiveSubjectService;
