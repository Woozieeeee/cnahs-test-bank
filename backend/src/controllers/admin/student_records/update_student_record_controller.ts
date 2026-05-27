import { Request, Response } from "express";
import { updateStudentRecordService } from "../../../services/admin/student_records/update_student_record_service";

export const updateStudentRecord = async (
  req: Request,

  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const {
      studentId,

      firstName,

      middleName,

      lastName,

      suffix,

      program,
    } = req.body;

    const updatedRecord = await updateStudentRecordService({
      id,

      studentId,

      firstName,

      middleName,

      lastName,

      suffix,

      program,
    });

    return res.json(updatedRecord);
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      message: error.message || "Failed to update student record.",
    });
  }
};
