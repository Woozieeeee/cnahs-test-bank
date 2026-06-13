"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSectionService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const createSectionService = async ({ sectionCode, yearLevel, program, }) => {
    // =========================
    // NORMALIZE SECTION CODE
    // =========================
    const normalizedCode = sectionCode.trim().toUpperCase();
    // =========================
    // GENERATE SECTION NAME
    // =========================
    const name = `${program}-${yearLevel}${normalizedCode}`;
    // =========================
    // CHECK DUPLICATE
    // =========================
    const existingSection = await prisma_1.default.section.findFirst({
        where: {
            program,
            yearLevel,
            sectionCode: normalizedCode,
        },
    });
    if (existingSection) {
        throw new Error("Section already exists.");
    }
    // =========================
    // CREATE SECTION
    // =========================
    return prisma_1.default.section.create({
        data: {
            name,
            sectionCode: normalizedCode,
            yearLevel,
            program,
        },
    });
};
exports.createSectionService = createSectionService;
