import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { approveStudentService } from "../../../services/admin/approvals/approve_student_service";

import { logActivity } from "../../../utils/log_activity";

export const approveStudent = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const adminName = req.user?.name;

    const student = await approveStudentService(id, adminName);

    let activityLogRecorded = true;
    try {
      await logActivity({
        action: "Approved student account",

        category: "USER_MANAGEMENT",

        severity: "INFO",

        description: `${adminName} approved ${student.name}`,

        performedBy: adminName || "Unknown Admin",

        targetUser: student.name,
      });
    } catch (error) {
      activityLogRecorded = false;
      console.error("Failed to record activity log (approve student):", error);
    }

    return res.json({
      message: "Student approved successfully.",

      student,

      activityLogRecorded,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to approve student.",
    });
  }
};
