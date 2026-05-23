import { Request, Response } from "express";

import { getRecentActivityService } from "../../services/admin/get_recent_activity_service";

export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    const activities = await getRecentActivityService();

    return res.json(activities);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch recent activity",
    });
  }
};
