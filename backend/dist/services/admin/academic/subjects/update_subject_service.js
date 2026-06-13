"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubjectService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const updateSubjectService = async ({ id, name, code, description, }) => {
    const existingSubject = await prisma_1.default.subject.findFirst({
        where: {
            code,
            NOT: {
                id,
            },
        },
    });
    if (existingSubject) {
        throw new Error("Subject code already exists.");
    }
    return prisma_1.default.subject.update({
        where: {
            id,
        },
        data: {
            name,
            code,
            description,
        },
    });
};
exports.updateSubjectService = updateSubjectService;
