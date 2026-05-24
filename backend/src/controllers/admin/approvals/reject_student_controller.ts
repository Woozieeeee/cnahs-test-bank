import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { rejectStudentService } from "../../../services/admin/approvals/reject_student_service";

export const rejectStudent = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const adminName = req.user?.name;

    const student = await rejectStudentService(id, adminName);

    return res.json({
      message: "Student rejected successfully.",

      student,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to reject student.",
    });
  }
};
