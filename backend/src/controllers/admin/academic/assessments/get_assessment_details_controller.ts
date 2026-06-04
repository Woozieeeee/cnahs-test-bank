import { Request, Response } from "express";

import { getAssessmentDetailsService } from "../../../../services/admin/academic/assessments/get_assessment_details_service";

export const getAssessmentDetailsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const assessmentId = Number(req.params.assessmentId);

    const assessment = await getAssessmentDetailsService(assessmentId);

    res.json(assessment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch assessment details",
    });
  }
};
