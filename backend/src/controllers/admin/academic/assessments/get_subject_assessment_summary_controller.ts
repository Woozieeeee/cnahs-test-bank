import { Request, Response } from "express";

import { getSubjectAssessmentSummaryService } from "../../../../services/admin/academic/assessments/get_subject_assessment_summary_service";

export const getSubjectAssessmentSummaryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const subjectId = Number(req.params.id);

    const summary = await getSubjectAssessmentSummaryService(subjectId);

    res.json(summary);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch assessment summary",
    });
  }
};
