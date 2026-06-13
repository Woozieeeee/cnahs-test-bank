import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { createTopicService } from "../../../services/faculty/topics/create_topic_service";

export const createTopicController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user!.id;

    const subjectId = Number(req.params.subjectId);

    const topic = await createTopicService({
      facultyId,

      subjectId,

      ...req.body,
    });

    return res.status(201).json(topic);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
