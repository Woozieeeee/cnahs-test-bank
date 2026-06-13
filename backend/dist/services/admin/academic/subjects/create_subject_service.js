"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubjectService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
// Generate slug from name
const generateSlug = (name) => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Remove multiple consecutive hyphens
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};
const createSubjectService = async ({ name, code, description, }) => {
    const existingSubject = await prisma_1.default.subject.findUnique({
        where: {
            code,
        },
    });
    if (existingSubject) {
        throw new Error("Subject code already exists.");
    }
    // Generate slug and ensure uniqueness
    let slug = generateSlug(name);
    let counter = 1;
    let uniqueSlug = slug;
    while (await prisma_1.default.subject.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }
    return prisma_1.default.subject.create({
        data: {
            name,
            code,
            description,
            slug: uniqueSlug,
        },
    });
};
exports.createSubjectService = createSubjectService;
