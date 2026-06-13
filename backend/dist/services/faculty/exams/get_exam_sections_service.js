"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamSectionsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getExamSectionsService = async (facultyId, subjectId) => {
    const sections = await prisma_1.default.sectionSubject.findMany({
        where: {
            subjectId,
        },
        select: {
            section: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: {
            section: {
                name: "asc",
            },
        },
    });
    return sections.map((item) => item.section);
};
exports.getExamSectionsService = getExamSectionsService;
