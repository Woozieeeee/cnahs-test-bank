import { Request, Response } from "express";

import { getExamBuilderQuestionsService } from "../../../services/faculty/exams/get_exam_builder_questions_service";

export const getExamBuilderQuestionsController = async (
  req: Request,
  res: Response,
) => {
  const subjectId = Number(req.params.subjectId);

  const difficulty = String(req.query.difficulty);

  const questions = await getExamBuilderQuestionsService(subjectId, difficulty);

  res.status(200).json(questions);
};
