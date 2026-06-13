import { Response } from "express";

import { AuthRequest } from "../../middleware/auth_middleware";
import { getAvatarService } from "../../services/auth/upload_avatar_service";

export const getAvatarController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const avatar = await getAvatarService(req.user!.id);

    if (!avatar) {
      return res.status(404).json({
        message: "Avatar not found",
      });
    }

    res.setHeader("Content-Type", avatar.mimeType);
    res.setHeader("Cache-Control", "private, max-age=3600");

    return res.status(200).send(avatar.buffer);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch avatar",
    });
  }
};
