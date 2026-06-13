"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const userSelect = {
    id: true,
    name: true,
    studentId: true,
    username: true,
    role: true,
    status: true,
    createdAt: true,
};
const ROLE_ORDER = {
    STUDENT: 0,
    FACULTY: 1,
    ADMIN: 2,
};
function buildWhereClause(search, role, status) {
    const whereClause = {};
    if (search) {
        whereClause.OR = [
            { name: { contains: search } },
            { studentId: { contains: search } },
            { username: { contains: search } },
        ];
    }
    if (role !== "ALL") {
        whereClause.role = role;
    }
    if (status !== "ALL") {
        whereClause.status = status;
    }
    return whereClause;
}
function sortUsersByRole(users) {
    return [...users].sort((a, b) => {
        const roleDiff = ROLE_ORDER[a.role] - ROLE_ORDER[b.role];
        if (roleDiff !== 0)
            return roleDiff;
        return b.createdAt.getTime() - a.createdAt.getTime();
    });
}
const getUsersService = async ({ page = 1, limit = 10, search = "", role = "ALL", status = "ALL", }) => {
    const skip = (page - 1) * limit;
    const whereClause = buildWhereClause(search, role, status);
    const totalUsers = await prisma_1.default.user.count({ where: whereClause });
    let users;
    if (role === "ALL") {
        const allUsers = await prisma_1.default.user.findMany({
            where: whereClause,
            select: { id: true, role: true, createdAt: true },
        });
        const sortedIds = sortUsersByRole(allUsers)
            .slice(skip, skip + limit)
            .map((user) => user.id);
        if (sortedIds.length === 0) {
            users = [];
        }
        else {
            const pageUsers = await prisma_1.default.user.findMany({
                where: { id: { in: sortedIds } },
                select: userSelect,
            });
            const userMap = new Map(pageUsers.map((user) => [user.id, user]));
            users = sortedIds
                .map((id) => userMap.get(id))
                .filter((user) => Boolean(user));
        }
    }
    else {
        users = await prisma_1.default.user.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
            select: userSelect,
        });
    }
    return {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
    };
};
exports.getUsersService = getUsersService;
