import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { restoreQuestionService } from "../../../services/faculty/questions/restore_question_service";

export const restoreQuestionController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user!.id;

    const questionId = Number(req.params.questionId);

    const question = await restoreQuestionService(facultyId, questionId);

    return res.json({
      message: "Question restored successfully",

      question,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
