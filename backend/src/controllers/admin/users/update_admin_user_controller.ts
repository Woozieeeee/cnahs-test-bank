import { Request, Response } from "express";
import { updateAdminUserService } from "../../../services/admin/users/update_admin_user_service";

export const updateAdminUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = Number(req.params.id);
    const { name, username, status, password } = req.body;

    if (Number.isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await updateAdminUserService({
      userId,
      name,
      username,
      status,
      password,
    });

    return res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update user";
    const statusCode =
      message === "User not found"
        ? 404
        : message.includes("already exists") ||
            message.includes("cannot") ||
            message.includes("Invalid") ||
            message.includes("required") ||
            message.includes("No changes")
          ? 400
          : 500;

    return res.status(statusCode).json({ message });
  }
};
