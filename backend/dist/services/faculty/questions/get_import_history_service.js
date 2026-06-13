"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportHistoryService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getImportHistoryService = async (facultyId, topicId) => {
    return prisma_1.default.importJob.findMany({
        where: {
            topicId,
            createdById: facultyId,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            filename: true,
            status: true,
            totalRows: true,
            importedRows: true,
            skippedRows: true,
            createdAt: true,
            completedAt: true,
            fileSize: true,
            mimeType: true,
            batches: {
                select: {
                    id: true,
                    importedRows: true,
                    skippedRows: true,
                    completedAt: true,
                },
            },
        },
    });
};
exports.getImportHistoryService = getImportHistoryService;
