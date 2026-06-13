"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignSubjectSectionsService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const assignSubjectSectionsService = async (subjectId, sectionIds) => {
    // REMOVE OLD ASSIGNMENTS
    await prisma_1.default.sectionSubject.deleteMany({
        where: {
            subjectId,
        },
    });
    // CREATE NEW ASSIGNMENTS
    return prisma_1.default.sectionSubject.createMany({
        data: sectionIds.map((sectionId) => ({
            subjectId,
            sectionId,
        })),
    });
};
exports.assignSubjectSectionsService = assignSubjectSectionsService;
