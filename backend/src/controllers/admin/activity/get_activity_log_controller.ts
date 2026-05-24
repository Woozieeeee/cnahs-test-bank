import { Request, Response } from "express";

import { getActivityLogsService } from "../../../services/admin/activity/get_activity_logs_service";

export const getActivityLogs = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const search = String(req.query.search || "");

    const category = String(req.query.category || "ALL");

    const severity = String(req.query.severity || "ALL");

    const result = await getActivityLogsService({
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
