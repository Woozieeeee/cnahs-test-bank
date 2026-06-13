"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveExamDraftService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const saveExamDraftService = async ({ facultyId, subjectId, currentStep, title, draftData, }) => {
    return prisma_1.default.examDraft.upsert({
        where: {
            facultyId_subjectId: {
                facultyId,
                subjectId,
            },
        },
        update: {
            currentStep,
            title,
            draftData,
        },
        create: {
            facultyId,
            subjectId,
            currentStep,
            title,
            draftData,
        },
    });
};
exports.saveExamDraftService = saveExamDraftService;
