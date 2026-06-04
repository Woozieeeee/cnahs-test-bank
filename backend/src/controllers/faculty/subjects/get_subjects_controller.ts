import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { getSubjectsService } from "../../../services/faculty/subjects/get_subjects_service";

export const getSubjectsController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user!.id;

    const subjects = await getSubjectsService(facultyId);

    return res.status(200).json(subjects);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to load subjects",
    });
  }
};
