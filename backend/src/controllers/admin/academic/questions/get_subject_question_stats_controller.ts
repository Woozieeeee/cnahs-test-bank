import { Request, Response } from "express";

import { getSubjectQuestionStatsService } from "../../../../services/admin/academic/questions/get_subject_question_stats_service";

export const getSubjectQuestionStatsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const subjectId = Number(req.params.id);

    const stats = await getSubjectQuestionStatsService(subjectId);

    return res.status(200).json(stats);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch question statistics",
    });
  }
};
