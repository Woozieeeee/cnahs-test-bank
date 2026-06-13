"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityLogsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const HIDDEN_ACTIONS = ["APPROVE_STUDENT", "REJECT_STUDENT", "CREATE_FACULTY"];
const getActivityLogsService = async ({ page = 1, limit = 10, search = "", category, severity, }) => {
    const skip = (page - 1) * limit;
    const where = {
        NOT: [
            {
                action: {
                    in: HIDDEN_ACTIONS,
                },
            },
        ],
    };
    // SEARCH
    if (search) {
        where.OR = [
            {
                action: {
                    contains: search,
                },
            },
            {
                performedBy: {
                    contains: search,
                },
            },
            {
                targetUser: {
                    contains: search,
                },
            },
            {
                description: {
                    contains: search,
                },
            },
        ];
    }
    // SEVERITY FILTER
    if (severity && severity !== "ALL") {
        where.severity = severity;
    }
    // FETCH ALL LOGS
    const allLogs = await prisma_1.default.activityLog.findMany({
        where,
        orderBy: {
            createdAt: "desc",
        },
    });
    // CATEGORY FILTER
    const filteredLogs = category && category !== "ALL"
        ? allLogs.filter((log) => Array.isArray(log.categories) && log.categories.includes(category))
        : allLogs;
    // MANUAL PAGINATION
    const paginatedLogs = filteredLogs.slice(skip, skip + limit);
    return {
        logs: paginatedLogs,
        totalPages: Math.ceil(filteredLogs.length / limit),
        currentPage: page,
    };
};
exports.getActivityLogsService = getActivityLogsService;
