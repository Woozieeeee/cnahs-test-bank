import { Request, Response } from "express";

import { getSubjectAssessmentsService } from "../../../../services/admin/academic/assessments/get_subject_assessments_service";

export const getSubjectAssessmentsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const subjectId = Number(req.params.id);

    const assessments = await getSubjectAssessmentsService(subjectId);

    res.json(assessments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch assessments",
    });
  }
};
