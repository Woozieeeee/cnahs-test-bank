import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { archiveTopicService } from "../../../services/faculty/topics/archive_topic_service";

export const archiveTopicController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user!.id;

    const topicId = Number(req.params.topicId);

    const topic = await archiveTopicService(facultyId, topicId);

    return res.status(200).json(topic);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,

      dependencies: error.dependencies || null,
    });
  }
};
