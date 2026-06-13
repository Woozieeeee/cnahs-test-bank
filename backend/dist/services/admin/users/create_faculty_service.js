"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFacultyService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const createFacultyService = async ({ name, username, password, }) => {
    const existingUser = await prisma_1.default.user.findFirst({
        where: {
            username,
        },
    });
    if (existingUser) {
        throw new Error("Username already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const faculty = await prisma_1.default.user.create({
        data: {
            name,
            username,
            password: hashedPassword,
            role: "FACULTY",
            status: "APPROVED",
            isFirstLogin: true,
        },
    });
    return faculty;
};
exports.createFacultyService = createFacultyService;
