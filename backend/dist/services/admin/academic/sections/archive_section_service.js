"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveSectionService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const archiveSectionService = async (id) => {
    const section = await prisma_1.default.section.findUnique({
        where: { id },
    });
    if (!section) {
        throw new Error("Section not found");
    }
    return prisma_1.default.section.update({
        where: { id },
        data: {
            isArchived: true,
        },
    });
};
exports.archiveSectionService = archiveSectionService;
