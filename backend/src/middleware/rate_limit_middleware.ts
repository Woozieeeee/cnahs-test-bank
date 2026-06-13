import rateLimit from "express-rate-limit";
import { Request, Response } from "express";
import prisma from "../lib/prisma";

declare module "express" {
  interface Request {
    rateLimit?: {
      resetTime?: Date;
    };
  }
}

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,

  handler: async (req: Request, res: Response, next: () => void) => {
    const { identifier } = req.body;

    try {
      // Check if the identifier belongs to admin or faculty
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ studentId: identifier }, { username: identifier }],
        },
        select: {
          role: true,
        },
      });

      // Allow admin and faculty to bypass rate limit
      if (user && (user.role === "ADMIN" || user.role === "FACULTY")) {
        return next();
      }
    } catch {
      // If check fails, proceed with rate limit
    }

    const resetTime = req.rateLimit?.resetTime;
    const remainingTime = resetTime
      ? Math.ceil((resetTime.getTime() - Date.now()) / 1000)
      : 900;

    res.status(429).json({
      message: "Too many login attempts. Please try again later.",
      remainingTime,
    });
  },

  standardHeaders: true,

  legacyHeaders: false,
});

export const passwordResetRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  handler: (req: Request, res: Response) => {
    const resetTime = req.rateLimit?.resetTime;
    const remainingTime = resetTime
      ? Math.ceil((resetTime.getTime() - Date.now()) / 1000)
      : 900;

    res.status(429).json({
      message: "Too many password reset requests. Please try again later.",
      remainingTime,
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});
