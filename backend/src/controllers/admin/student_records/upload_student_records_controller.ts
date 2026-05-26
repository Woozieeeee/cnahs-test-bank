import { Request, Response } from "express";

import fs from "fs";

import csv from "csv-parser";

import { uploadStudentRecordsService } from "../../../services/admin/student_records/upload_student_records_service";

export const uploadStudentRecords = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "CSV file is required",
      });
    }

    const results: any[] = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          studentId: data.studentId,

          fullName: data.fullName,

          program: data.program,
        });
      })

      .on("end", async () => {
        const summary = await uploadStudentRecordsService(results);

        return res.json({
          message: "Student records uploaded successfully",

          ...summary,
        });
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to upload records",
    });
  }
};
