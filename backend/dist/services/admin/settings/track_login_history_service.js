"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginHistoryService = exports.trackLoginHistoryService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const trackLoginHistoryService = async (data) => {
    try {
        const { userId, ipAddress, userAgent } = data;
        // Create login history record
        const loginHistory = await prisma_1.default.loginHistory.create({
            data: {
                userId,
                ipAddress: ipAddress || null,
                userAgent: userAgent || null,
                success: true,
                loginTime: new Date(),
            },
        });
        console.log(`[LoginHistoryService] Login tracked for user: ${userId}`);
        return loginHistory;
    }
    catch (error) {
        console.error("[LoginHistoryService] Error tracking login:", error);
        throw error;
    }
};
exports.trackLoginHistoryService = trackLoginHistoryService;
const getLoginHistoryService = async (userId, limit = 10) => {
    try {
        const loginHistory = await prisma_1.default.loginHistory.findMany({
            where: { userId },
            orderBy: { loginTime: "desc" },
            take: limit,
        });
        return loginHistory;
    }
    catch (error) {
        console.error("[LoginHistoryService] Error fetching login history:", error);
        throw error;
    }
};
exports.getLoginHistoryService = getLoginHistoryService;
