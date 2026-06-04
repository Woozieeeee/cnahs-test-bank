import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { getTopicQuestionsService } from "../../../services/faculty/questions/get_topic_questions_service";

export const getTopicQuestionsController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user!.id;

    const topicId = Number(req.params.topicId);

    const questions = await getTopicQuestionsService(facultyId, topicId);

    return res.json(questions);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
