"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignFacultiesToSubjectService = void 0;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
const assignFacultiesToSubjectService = async (subjectId, facultyIds) => {
    // REMOVE OLD FACULTY POOL
    await prisma_1.default.subjectFaculty.deleteMany({
        where: {
            subjectId,
        },
    });
    // CREATE NEW FACULTY POOL
    return prisma_1.default.subjectFaculty.createMany({
        data: facultyIds.map((facultyId) => ({
            subjectId,
            facultyId,
        })),
    });
};
exports.assignFacultiesToSubjectService = assignFacultiesToSubjectService;
