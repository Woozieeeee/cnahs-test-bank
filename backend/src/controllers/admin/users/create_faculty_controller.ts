import { Response } from "express";

import { createFacultyService } from "../../../services/admin/users/create_faculty_service";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { logActivity } from "../../../utils/log_activity";

export const createFaculty = async (req: AuthRequest, res: Response) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const faculty = await createFacultyService({
      name,
      username,
      password,
    });

    const adminName = req.user?.name;

    let activityLogRecorded = true;
    try {
      await logActivity({
        action: "CREATE_FACULTY",

        category: "USER_MANAGEMENT",

        severity: "INFO",

        description: `${adminName} created faculty ${faculty.name}`,

        performedBy: adminName || "Unknown Admin",

        targetUser: faculty.name,
      });
    } catch (error) {
      activityLogRecorded = false;
      console.error("Failed to record activity log (create faculty):", error);
    }

    return res.status(201).json({
      message: "Faculty created successfully",
      faculty,
      activityLogRecorded,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};
