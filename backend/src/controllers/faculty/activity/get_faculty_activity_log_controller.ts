import { Response } from "express";

import {
  authMiddleware,
  AuthRequest,
} from "../../../middleware/auth_middleware";

import { getFacultyActivityLogsService } from "../../../services/faculty/activity/get_faculty_activity_logs_service";

export const getFacultyActivityLogs = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user?.id;

    if (!facultyId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const search = String(req.query.search || "");

    const category = String(req.query.category || "ALL");

    const severity = String(req.query.severity || "ALL");

    const result = await getFacultyActivityLogsService({
      facultyId: Number(facultyId),

      page,

      limit,

      search,

      category,

      severity,
    });

    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch activity logs",
    });
  }
};
