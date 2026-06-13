"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentLoginsController = void 0;
const log_login_service_1 = require("../../../services/admin/settings/log_login_service");
/**
 * Get recent login attempts across all users (admin dashboard)
 * Query params: limit
 */
const getRecentLoginsController = async (req, res) => {
    try {
        const adminId = req.user?.id;
        if (!adminId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Admin ID not found",
            });
        }
        const { limit = 20 } = req.query;
        const numLimit = Math.min(parseInt(limit) || 20, 100); // Cap at 100 records
        const recentLogins = await (0, log_login_service_1.getRecentLoginAttemptsService)(numLimit);
        console.log(`[RecentLoginsController] Fetched recent logins by admin ${adminId}`);
        return res.json({
            success: true,
            data: recentLogins,
            count: recentLogins.length,
        });
    }
    catch (error) {
        console.error("[RecentLoginsController] Error fetching recent logins:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch recent logins",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getRecentLoginsController = getRecentLoginsController;
