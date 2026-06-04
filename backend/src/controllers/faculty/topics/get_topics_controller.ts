import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { getTopicsService } from "../../../services/faculty/topics/get_topics_service";

export const getTopicsController = async (req: AuthRequest, res: Response) => {
  try {
    const facultyId = req.user!.id;

    const subjectId = Number(req.params.subjectId);

    const topics = await getTopicsService(facultyId, subjectId);

    return res.status(200).json(topics);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
