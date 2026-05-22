import { Response } from "express";
import prisma from "../lib/prisma";

import { AuthRequest } from "../middleware/auth_middleware";

export const getMe = async (
  req: AuthRequest,
  res: Response
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const { password, ...safeUser } = user;

  res.json(safeUser);
};