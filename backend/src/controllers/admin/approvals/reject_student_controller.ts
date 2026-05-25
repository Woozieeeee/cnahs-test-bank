import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { rejectStudentService } from "../../../services/admin/approvals/reject_student_service";

import { logActivity } from "../../../utils/log_activity";

export const rejectStudent = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const adminName = req.user?.name;

    const student = await rejectStudentService(id, adminName);

    let activityLogRecorded = true;
    try {
      await logActivity({
        action: "Rejected student account",

        category: "USER_MANAGEMENT",

        severity: "INFO",

        description: `${adminName} rejected ${student.name}`,

        performedBy: adminName || "Unknown Admin",

        targetUser: student.name,
      });
    } catch (error) {
      activityLogRecorded = false;
      console.error("Failed to record activity log (reject student):", error);
    }

    return res.json({
      message: "Student rejected successfully.",

      student,

      activityLogRecorded,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to reject student.",
    });
  }
};
