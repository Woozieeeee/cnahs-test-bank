import { Request, Response } from "express";

import { getSubjectAssessmentsService } from "../../../services/faculty/assessments/get_subject_assessments_service";

export const getSubjectAssessmentsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const facultyId = (req as any).user.id;

    const subjectId = Number(req.params.subjectId);

    const data = await getSubjectAssessmentsService(facultyId, subjectId);

    return res.json(data);
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: error.message || "Failed to load assessments.",
    });
  }
};
