import { Request, Response } from "express";

import { updateExamService } from "../../../services/faculty/exams/update_exam_service";
import { CreateExamPayload } from "../../../types/exams/create_exams_payload";

export const updateExamController = async (
  req: Request,
  res: Response
) => {
  const facultyId = (req as any).user.id;
  const subjectId = Number(req.params.subjectId);
  const examId = Number(req.params.examId);
  const payload: CreateExamPayload = req.body;

  try {
    const updatedExam = await updateExamService({
      facultyId,
      subjectId,
      examId,
      payload,
    });

    res.status(200).json(updatedExam);
  } catch (error: any) {
    console.error("Error updating exam:", error);

    if (error.message.includes("not found")) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes("unauthorized")) {
      res.status(403).json({ message: error.message });
    } else if (error.message.includes("At least one question")) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
