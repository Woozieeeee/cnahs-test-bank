import { Request, Response } from "express";

import { restoreSubjectService } from "../../../../services/admin/academic/subjects/restore_subject_service";

export const restoreSubject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await restoreSubjectService(id);

    return res.json({
      message: "Subject restored successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
