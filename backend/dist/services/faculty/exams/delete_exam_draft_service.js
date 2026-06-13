"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExamDraftService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const deleteExamDraftService = async (facultyId, subjectId) => {
    const draft = await prisma_1.default.examDraft.findUnique({
        where: {
            facultyId_subjectId: {
                facultyId,
                subjectId,
            },
        },
    });
    if (!draft) {
        return;
    }
    await prisma_1.default.examDraft.delete({
        where: {
            id: draft.id,
        },
    });
};
exports.deleteExamDraftService = deleteExamDraftService;
