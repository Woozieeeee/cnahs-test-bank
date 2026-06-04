import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { restoreTopicService } from "../../../services/faculty/topics/restore_topic_service";

export const restoreTopicController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user!.id;

    const topicId = Number(req.params.topicId);

    const topic = await restoreTopicService(facultyId, topicId);

    return res.status(200).json({
      message: "Topic restored successfully",

      topic,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
