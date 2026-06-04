import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { updateTopicService } from "../../../services/faculty/topics/update_topic_service";

export const updateTopicController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const topicId = Number(req.params.topicId);

    const facultyId = req.user!.id;

    const topic = await updateTopicService({
      facultyId,

      topicId,

      ...req.body,
    });

    return res.status(200).json({
      message: "Topic updated successfully",

      topic,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
