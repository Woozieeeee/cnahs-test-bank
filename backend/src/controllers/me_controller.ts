import { Response } from "express";

import { AuthRequest } from "../middleware/auth_middleware";

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      user: {
        id: req.user.id,

        name: req.user.name,

        username: req.user.username,

        studentId: req.user.studentId,

        role: req.user.role,

        status: req.user.status,

        isFirstLogin: req.user.isFirstLogin,

        createdAt: req.user.createdAt,

        updatedAt: req.user.updatedAt,

        hasAvatar: !!req.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
