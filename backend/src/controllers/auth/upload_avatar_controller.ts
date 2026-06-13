import { Response } from "express";

import { AuthRequest } from "../../middleware/auth_middleware";
import {
  deleteAvatarService,
  uploadAvatarService,
} from "../../services/auth/upload_avatar_service";

export const uploadAvatarController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Avatar image is required",
      });
    }

    const updatedUser = await uploadAvatarService(
      req.user!.id,
      req.file.buffer,
      req.file.mimetype,
    );

    return res.status(200).json({
      message: "Avatar updated successfully",
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
        hasAvatar: true,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message ?? "Failed to upload avatar",
    });
  }
};

export const deleteAvatarController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const updatedUser = await deleteAvatarService(req.user!.id);

    return res.status(200).json({
      message: "Avatar removed successfully",
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
        hasAvatar: false,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message ?? "Failed to remove avatar",
    });
  }
};
