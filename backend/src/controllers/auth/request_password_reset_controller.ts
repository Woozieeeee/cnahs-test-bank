import { Request, Response } from "express";
import { requestPasswordResetService } from "../../services/auth/request_password_reset_service";

export const requestPasswordResetController = async (
  req: Request,
  res: Response,
) => {
  try {
    const identifier = String(req.body?.identifier ?? "");

    await requestPasswordResetService(identifier);

    return res.status(200).json({
      message:
        "Your password change request has been sent to the administrator. Kindly visit the Dean's Office for further assistance.",
    });
  } catch (error) {
    console.error("Password reset request failed:", error);

    return res.status(200).json({
      message:
        "Your password change request has been sent to the administrator. Kindly visit the Dean's Office for further assistance.",
    });
  }
};
