import { Request, Response } from "express";

import { getQuestionDetailsService } from "../../../../services/admin/academic/questions/get_question_details_service";

export const getQuestionDetailsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const questionId = Number(req.params.questionId);

    const question = await getQuestionDetailsService(questionId);

    return res.status(200).json(question);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch question details",
    });
  }
};
