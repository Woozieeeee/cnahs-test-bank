import { Request, Response } from "express";

import { getStudentRecordsService } from "../../../../services/admin/academic/sections/get_student_records_service";

export const getStudentRecords = async (req: Request, res: Response) => {
  try {
    const records = await getStudentRecordsService();

    return res.json(records);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch student records.",
    });
  }
};
