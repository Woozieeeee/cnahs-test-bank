import { Request, Response } from "express";
import { changePasswordService } from "../../../services/admin/settings/change_password_service";

export const changePasswordController = async (
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

    const { currentPassword, newPassword } = req.body;

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    const result = await changePasswordService({
      userId: adminId,
      currentPassword,
      newPassword,
    });

    console.log("[ChangePasswordController] Password changed by admin:", adminId);

    return res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("[ChangePasswordController] Error changing password:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to change password";

    // Handle specific error cases
    if (
      errorMessage.includes("incorrect") ||
      errorMessage.includes("different") ||
      errorMessage.includes("characters")
    ) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to change password",
      error: errorMessage,
    });
  }
};
