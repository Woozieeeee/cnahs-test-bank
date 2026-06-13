"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamDraftService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getExamDraftService = async (facultyId, subjectId) => {
    return prisma_1.default.examDraft.findUnique({
        where: {
            facultyId_subjectId: {
                facultyId,
                subjectId,
            },
        },
    });
};
exports.getExamDraftService = getExamDraftService;
