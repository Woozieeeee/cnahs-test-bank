import { Request, Response } from "express";

import { deleteExamDraftService } from "../../../services/faculty/exams/delete_exam_draft_service";

export const deleteExamDraftController = async (
  req: Request,
  res: Response,
) => {
  const facultyId = (req as any).user.id;

  const subjectId = Number(req.params.subjectId);

  await deleteExamDraftService(facultyId, subjectId);

  res.status(200).json({
    message: "Draft deleted successfully.",
  });
};
