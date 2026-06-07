import { Request, Response } from "express";

import { getFacultySectionsService } from "../../../services/faculty/exams/get_faculty_sections_service";

export const getFacultySectionsController = async (
  req: Request,
  res: Response,
) => {
  const facultyId = (req as any).user.id;

  const sections = await getFacultySectionsService(facultyId);

  return res.status(200).json(sections);
};
