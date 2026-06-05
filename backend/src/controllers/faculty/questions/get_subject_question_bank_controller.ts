import { Request, Response } from "express";

import { getSubjectQuestionBankService } from "../../../services/faculty/questions/get_subject_question_bank_service";

export const getSubjectQuestionBankController = async (
  req: Request,
  res: Response,
) => {
  try {
    const facultyId = (req as any).user.id;

    const subjectId = Number(req.params.subjectId);

    const data = await getSubjectQuestionBankService(facultyId, subjectId);

    return res.json(data);
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: error.message || "Failed to load question bank.",
    });
  }
};
