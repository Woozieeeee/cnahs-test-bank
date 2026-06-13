"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSectionService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const updateSectionService = async (id, data) => {
    const existingSection = await prisma_1.default.section.findUnique({
        where: { id },
    });
    if (!existingSection) {
        throw new Error("Section not found");
    }
    const generatedName = `${data.program}-${data.yearLevel}${data.sectionCode}`;
    return prisma_1.default.section.update({
        where: { id },
        data: {
            name: generatedName,
            sectionCode: data.sectionCode,
            yearLevel: data.yearLevel,
            program: data.program,
        },
    });
};
exports.updateSectionService = updateSectionService;
