import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { getDashboardService } from "../../../services/faculty/dashboard/get_dashboard_service";

export const getDashboardController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user!.id;

    const dashboard = await getDashboardService(facultyId);

    return res.status(200).json(dashboard);
  } catch (error) {
    console.error("FACULTY DASHBOARD ERROR:", error);

    return res.status(500).json({
      message: "Failed to load faculty dashboard",
    });
  }
};
