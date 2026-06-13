import { Request, Response } from "express";
import { getLoginHistoryService } from "../../../services/admin/settings/log_login_service";

/**
 * Get login history for a specific user
 * Query params: userId, limit
 */
export const getLoginHistoryController = async (
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

    const { userId, limit = 50 } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const numLimit = Math.min(parseInt(limit as string) || 50, 500); // Cap at 500 records

    const loginHistory = await getLoginHistoryService(
      parseInt(userId as string),
      numLimit
    );

    console.log(
      `[LoginHistoryController] Fetched login history for user ${userId} by admin ${adminId}`
    );

    return res.json({
      success: true,
      data: loginHistory,
      count: loginHistory.length,
    });
  } catch (error) {
    console.error("[LoginHistoryController] Error fetching login history:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch login history",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
