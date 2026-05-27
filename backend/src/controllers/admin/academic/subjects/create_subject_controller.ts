import { Request, Response } from "express";

import { createSubjectService } from "../../../../services/admin/academic/subjects/create_subject_service";

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, code, description } = req.body;

    const subject = await createSubjectService({
      name,
      code,
      description,
    });

    return res.status(201).json(subject);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
