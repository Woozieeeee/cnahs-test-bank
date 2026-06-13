import { Request, Response } from "express";

import { getExamForEditService } from "../../../services/faculty/exams/get_exam_for_edit_service";

export const getExamForEditController = async (
  req: Request,
  res: Response
) => {
  const facultyId = (req as any).user.id;
  const subjectId = Number(req.params.subjectId);
  const examId = Number(req.params.examId);

  try {
    const examData = await getExamForEditService(
      facultyId,
      subjectId,
      examId
    );

    res.status(200).json(examData);
  } catch (error: any) {
    console.error("Error fetching exam for edit:", error);

    if (error.message.includes("not found")) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes("unauthorized")) {
      res.status(403).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
