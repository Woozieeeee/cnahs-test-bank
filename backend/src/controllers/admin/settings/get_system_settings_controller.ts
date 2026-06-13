import { Request, Response } from "express";
import { getSystemSettingsService } from "../../../services/admin/settings/get_system_settings_service";

export const getSystemSettingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const settings = await getSystemSettingsService();

    return res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("[SystemSettingsController] Error fetching settings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch system settings",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
