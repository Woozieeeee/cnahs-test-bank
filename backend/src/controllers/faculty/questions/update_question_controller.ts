import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { updateQuestionService } from "../../../services/faculty/questions/update_question_service";

export const updateQuestionController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user!.id;

    const questionId = Number(req.params.questionId);

    const { question, explanation, difficulty, correctAnswer, options } =
      req.body;

    const updatedQuestion = await updateQuestionService({
      facultyId,

      questionId,

      question,

      explanation,

      difficulty,

      correctAnswer,

      options,
    });

    return res.status(200).json(updatedQuestion);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Failed to update question",
    });
  }
};
