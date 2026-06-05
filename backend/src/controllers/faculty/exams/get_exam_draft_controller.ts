import { Request, Response } from "express";

import { getExamDraftService } from "../../../services/faculty/exams/get_exam_draft_service";

export const getExamDraftController = async (req: Request, res: Response) => {
  const facultyId = (req as any).user.id;

  const subjectId = Number(req.params.subjectId);

  const draft = await getExamDraftService(facultyId, subjectId);

  res.status(200).json(draft);
};
