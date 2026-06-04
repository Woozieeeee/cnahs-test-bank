import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import prisma from "../lib/prisma";
import type { User } from "@prisma/client";

interface JwtPayload {
  userId: number;
}

export interface AuthRequest extends Request {
  user?: User;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // =========================
    // GET TOKEN FROM COOKIE
    // =========================

    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
      });

      return;
    }

    // =========================
    // VERIFY TOKEN
    // =========================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    // =========================
    // FIND USER
    // =========================

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      res.status(401).json({
        message: "User not found",
      });

      return;
    }

    // =========================
    // ATTACH USER
    // =========================

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });

    return;
  }
};
