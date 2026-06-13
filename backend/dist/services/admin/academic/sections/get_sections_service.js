"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSectionsService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const getSectionsService = async () => {
    return prisma_1.default.section.findMany({
        orderBy: [
            {
                isArchived: "asc",
            },
            {
                updatedAt: "desc",
            },
        ],
        include: {
            users: true,
            exams: true,
        },
    });
};
exports.getSectionsService = getSectionsService;
