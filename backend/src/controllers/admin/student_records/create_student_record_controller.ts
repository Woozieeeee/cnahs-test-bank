import { Request, Response } from "express";

import { createStudentRecordService } from "../../../services/admin/student_records/create_student_record_service";

export const createStudentRecord = async (
  req: Request,

  res: Response,
) => {
  try {
    const {
      studentId,

      firstName,

      middleName,

      lastName,

      suffix,

      program,
    } = req.body;

    const record = await createStudentRecordService({
      studentId,

      firstName,

      middleName,

      lastName,

      suffix,

      program,
    });

    return res.status(201).json(record);
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      message: error.message || "Failed to create student record",
    });
  }
};
