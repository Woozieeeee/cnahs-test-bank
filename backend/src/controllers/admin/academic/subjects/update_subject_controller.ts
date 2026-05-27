import { Request, Response } from "express";

import { updateSubjectService } from "../../../../services/admin/academic/subjects/update_subject_service";

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { name, code, description } = req.body;

    const subject = await updateSubjectService({
      id,
      name,
      code,
      description,
    });

    return res.json(subject);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
