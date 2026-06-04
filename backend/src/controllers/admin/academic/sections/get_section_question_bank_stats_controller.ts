import { Request, Response } from "express";

import { getSectionQuestionBankStatsService } from "../../../../services/admin/academic/sections/get_section_question_bank_stats_service";

export const getSectionQuestionBankStatsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const sectionId = Number(req.params.id);

    const stats = await getSectionQuestionBankStatsService(sectionId);

    res.json(stats);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch question bank statistics",
    });
  }
};
