import { Request, Response } from "express";

import { getSubjectsService } from "../../../../services/admin/academic/subjects/get_subject_service";

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const tab = (req.query.tab as string) || "ALL";

    const subjects = await getSubjectsService(tab);

    return res.json(subjects);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
