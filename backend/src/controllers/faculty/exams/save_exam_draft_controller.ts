import { Request, Response } from "express";

import { saveExamDraftService } from "../../../services/faculty/exams/save_exam_draft_service";

export const saveExamDraftController = async (req: Request, res: Response) => {
  const facultyId = (req as any).user.id;

  const subjectId = Number(req.params.subjectId);

  const { currentStep, title, draftData } = req.body;

  const draft = await saveExamDraftService({
    facultyId,
    subjectId,
    currentStep,
    title,
    draftData,
  });

  res.status(200).json(draft);
};
