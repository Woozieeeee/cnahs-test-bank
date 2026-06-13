"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentActivityService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const HIDDEN_ACTIONS = ["APPROVE_STUDENT", "REJECT_STUDENT", "CREATE_FACULTY"];
const getRecentActivityService = async () => {
    const activities = await prisma_1.default.activityLog.findMany({
        where: {
            NOT: [
                {
                    action: {
                        in: HIDDEN_ACTIONS,
                    },
                },
                {
                    action: {
                        startsWith: "GET ",
                    },
                },
                {
                    action: "Viewed dashboard",
                },
            ],
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 10,
    });
    return activities;
};
exports.getRecentActivityService = getRecentActivityService;
