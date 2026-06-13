"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportJobDetailsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getImportJobDetailsService = async (facultyId, jobId) => {
    const job = await prisma_1.default.importJob.findFirst({
        where: {
            id: jobId,
            createdById: facultyId,
        },
        include: {
            batches: {
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    filename: true,
                    totalRows: true,
                    importedRows: true,
                    skippedRows: true,
                    createdAt: true,
                    completedAt: true,
                },
            },
        },
    });
    if (!job) {
        throw new Error("Import job not found.");
    }
    return job;
};
exports.getImportJobDetailsService = getImportJobDetailsService;
