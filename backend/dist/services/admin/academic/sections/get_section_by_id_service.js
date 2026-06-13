"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSectionByIdService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const getSectionByIdService = async (id) => {
    return prisma_1.default.section.findUnique({
        where: {
            id,
        },
        include: {
            users: true,
            exams: true,
            sectionSubjects: {
                include: {
                    subject: {
                        include: {
                            faculties: true,
                        },
                    },
                },
            },
        },
    });
};
exports.getSectionByIdService = getSectionByIdService;
