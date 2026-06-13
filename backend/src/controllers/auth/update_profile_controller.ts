import { Response } from "express";

import { AuthRequest } from "../../middleware/auth_middleware";
import { updateProfileService } from "../../services/auth/update_profile_service";

export const updateProfileController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { name, username } = req.body;

    const updatedUser = await updateProfileService(req.user!.id, {
      name,
      username,
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        studentId: updatedUser.studentId,
        role: updatedUser.role,
        status: updatedUser.status,
        isFirstLogin: updatedUser.isFirstLogin,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        hasAvatar: !!updatedUser.avatar,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message ?? "Failed to update profile",
    });
  }
};
