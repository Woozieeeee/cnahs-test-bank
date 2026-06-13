"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginHistoryController = void 0;
const log_login_service_1 = require("../../../services/admin/settings/log_login_service");
/**
 * Get login history for a specific user
 * Query params: userId, limit
 */
const getLoginHistoryController = async (req, res) => {
    try {
        const adminId = req.user?.id;
        if (!adminId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Admin ID not found",
            });
        }
        const { userId, limit = 50 } = req.query;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const numLimit = Math.min(parseInt(limit) || 50, 500); // Cap at 500 records
        const loginHistory = await (0, log_login_service_1.getLoginHistoryService)(parseInt(userId), numLimit);
        console.log(`[LoginHistoryController] Fetched login history for user ${userId} by admin ${adminId}`);
        return res.json({
            success: true,
            data: loginHistory,
            count: loginHistory.length,
        });
    }
    catch (error) {
        console.error("[LoginHistoryController] Error fetching login history:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch login history",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getLoginHistoryController = getLoginHistoryController;
