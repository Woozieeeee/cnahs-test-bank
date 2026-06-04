import { Request, Response } from "express";

import { getSubjectQuestionsService } from "../../../../services/admin/academic/questions/get_subject_questions_service";

export const getSubjectQuestionsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const subjectId = Number(req.params.id);

    const questions = await getSubjectQuestionsService(subjectId);

    return res.status(200).json(questions);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch questions",
    });
  }
};
