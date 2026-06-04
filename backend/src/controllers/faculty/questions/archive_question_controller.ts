import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { archiveQuestionService } from "../../../services/faculty/questions/archive_question_service";

export const archiveQuestionController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user!.id;

    const questionId = Number(req.params.questionId);

    const question = await archiveQuestionService(facultyId, questionId);

    return res.json({
      message: "Question archived successfully",

      question,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,

      dependencies: error.dependencies,
    });
  }
};
