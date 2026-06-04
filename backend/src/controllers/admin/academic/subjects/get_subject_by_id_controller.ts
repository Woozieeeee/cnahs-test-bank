import { Request, Response } from "express";

import { getSubjectByIdService } from "../../../../services/admin/academic/subjects/get_subject_by_id_service";

export const getSubjectByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const subject = await getSubjectByIdService(id);

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    return res.status(200).json(subject);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch subject",
    });
  }
};
