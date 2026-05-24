import { Request, Response } from "express";

import { getPendingStudentsService } from "../../../services/admin/approvals/get_pending_students_service";

export const getPendingStudents = async (req: Request, res: Response) => {
  try {
    const students = await getPendingStudentsService();

    return res.json(students);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch pending students.",
    });
  }
};
