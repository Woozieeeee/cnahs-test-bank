import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth_middleware";

import { getSubjectByIdService } from "../../../services/faculty/subjects/get_subject_by_id_service";

export const getSubjectByIdController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const facultyId = req.user!.id;

    const subjectId = Number(req.params.subjectId);

    const subject = await getSubjectByIdService(facultyId, subjectId);

    return res.status(200).json(subject);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
