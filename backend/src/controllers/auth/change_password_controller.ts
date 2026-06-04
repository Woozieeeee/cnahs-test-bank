import { Response } from "express";

import { AuthRequest } from "../../middleware/auth_middleware";

import { logActivity } from "../../utils/log_activity";

import { changePasswordService } from "../../services/auth/change_password_service";

export const changePasswordController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await changePasswordService(
      req.user!.id,
      currentPassword,
      newPassword,
    );

    try {
      await logActivity({
        action: "Password changed",

        categories: ["AUTH", "SECURITY"],

        severity: "INFO",

        description: `${user.name} changed account password.`,

        performedBy: user.name,
      });
    } catch (error) {
      console.error("Failed to record password change activity:", error);
    }

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
