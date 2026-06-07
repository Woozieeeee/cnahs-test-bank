import { Response } from "express";

import { authMiddleware, AuthRequest } from "../../../middleware/auth_middleware";

import { getFacultyAssessmentDetailsService } from "../../../services/faculty/assessments/get_assessment_details_service";

export const getFacultyAssessmentDetails = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user?.id;

    if (!facultyId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const subjectId = Number(req.params.subjectId);

    const assessmentId = Number(req.params.assessmentId);

    const data = await getFacultyAssessmentDetailsService(
      facultyId,
      subjectId,
      assessmentId,
    );

    return res.json(data);
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: error.message || "Failed to load assessment details.",
    });
  }
};
