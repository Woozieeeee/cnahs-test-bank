import { Request, Response } from "express";
import { getRecentLoginAttemptsService } from "../../../services/admin/settings/log_login_service";

/**
 * Get recent login attempts across all users (admin dashboard)
 * Query params: limit
 */
export const getRecentLoginsController = async (
  req: Request,
  res: Response
) => {
  try {
    const adminId = (req as any).user?.id;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Admin ID not found",
      });
    }

    const { limit = 20 } = req.query;
    const numLimit = Math.min(parseInt(limit as string) || 20, 100); // Cap at 100 records

    const recentLogins = await getRecentLoginAttemptsService(numLimit);

    console.log(`[RecentLoginsController] Fetched recent logins by admin ${adminId}`);

    return res.json({
      success: true,
      data: recentLogins,
      count: recentLogins.length,
    });
  } catch (error) {
    console.error("[RecentLoginsController] Error fetching recent logins:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent logins",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
