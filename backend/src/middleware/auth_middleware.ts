import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import prisma from "../lib/prisma";

interface JwtPayload {
  userId: number;
}

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // =========================
    // GET TOKEN FROM COOKIE
    // =========================

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
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
      return res.status(401).json({
        message: "User not found",
      });
    }

    // =========================
    // ATTACH USER
    // =========================

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
