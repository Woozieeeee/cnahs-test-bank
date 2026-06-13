import { Request, Response } from "express";
import { updateSystemSettingsService } from "../../../services/admin/settings/update_system_settings_service";

export const updateSystemSettingsController = async (
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

    const settings = await updateSystemSettingsService(req.body);

    console.log("[SystemSettingsController] Settings updated by admin:", adminId);

    return res.json({
      success: true,
      message: "System settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("[SystemSettingsController] Error updating settings:", error);

    if (error instanceof Error && error.message.includes("between")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update system settings",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
