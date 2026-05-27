import { Request, Response } from "express";

import { archiveSubjectService } from "../../../../services/admin/academic/subjects/archive_subject_service";

export const archiveSubject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await archiveSubjectService(id);

    return res.json({
      message: "Subject archived successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
