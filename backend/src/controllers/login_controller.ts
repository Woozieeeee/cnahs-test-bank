import { Request, Response } from "express";
import { logActivity } from "../utils/log_activity";
import { loginService } from "../services/auth/login_service";

export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    const { token, user } = await loginService({
      identifier,
      password,
    });

    // =========================
    // SET COOKIE
    // =========================

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,

      secure: isProduction,

      sameSite: isProduction ? "none" : "lax",

      maxAge: 1000 * 60 * 60 * 24,
    });

    try {
      await logActivity({
        action: "User signed in",

        categories: ["AUTH", "SECURITY", "SYSTEM"],

        severity: "INFO",

        description: `${user.name} signed it successfully.`,

        performedBy: user.name,
      });
    } catch (error) {
      console.error("Failed to record login activity:", error);
    }

    return res.json({
      message: "Login successful",

      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
