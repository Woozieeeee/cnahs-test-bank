import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { createQuestionService } from "../../../services/faculty/questions/create_question_service";

export const createQuestionController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user!.id;

    const topicId = Number(req.params.topicId);

    const question = await createQuestionService({
      facultyId,

      topicId,

      ...req.body,
    });

    return res.status(201).json(question);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Failed to create question",
    });
  }
};
