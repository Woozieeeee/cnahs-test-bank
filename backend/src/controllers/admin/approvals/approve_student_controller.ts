import { Request, Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { approveStudentService } from "../../../services/admin/approvals/approve_student_service";

export const approveStudent = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const adminName = req.user?.name;

    const student = await approveStudentService(id, adminName);

    return res.json({
      message: "Student approved successfully.",

      student,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to approve student.",
    });
  }
};
