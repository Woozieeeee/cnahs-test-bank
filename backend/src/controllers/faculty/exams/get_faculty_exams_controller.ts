import { Request, Response } from "express";

import { getFacultyExamsService } from "../../../services/faculty/exams/get_faculty_exams_service";

export const getFacultyExamsController = async (
  req: Request,
  res: Response,
) => {
  const facultyId = (req as any).user.id;

  const exams = await getFacultyExamsService(facultyId);

  return res.status(200).json(exams);
};
