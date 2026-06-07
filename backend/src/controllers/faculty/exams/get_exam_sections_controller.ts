import { Request, Response } from "express";

import { getExamSectionsService } from "../../../services/faculty/exams/get_exam_sections_service";

export const getExamSectionsController = async (
  req: Request,
  res: Response,
) => {
  const facultyId = (req as any).user.id;

  const subjectId = Number(req.params.subjectId);

  const sections = await getExamSectionsService(facultyId, subjectId);

  res.status(200).json(sections);
};
