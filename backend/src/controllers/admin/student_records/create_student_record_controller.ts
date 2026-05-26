import { Request, Response } from "express";

import { createStudentRecordService } from "../../../services/admin/student_records/create_student_record_service";

export const createStudentRecord = async (
  req: Request,

  res: Response,
) => {
  try {
    const {
      studentId,

      fullName,

      program,
    } = req.body;

    const record = await createStudentRecordService({
      studentId,

      fullName,

      program,
    });

    return res.status(201).json(record);
  } catch (error: any) {
    console.log(error);

    return res.status(400).json({
      message: error.message || "Failed to create student record",
    });
  }
};
