import { Request, Response } from "express";

import { getAdminExamsService, AdminExamFilter } from "../../../services/admin/exams/get_admin_exams_service";

export const getAdminExamsController = async (
  req: Request,
  res: Response,
) => {
  const filter: AdminExamFilter = {
    status: req.query.status as string[] | undefined,
    subjectId: req.query.subjectId ? Number(req.query.subjectId) : undefined,
    search: req.query.search as string | undefined,
  };

  const exams = await getAdminExamsService(filter);

  return res.status(200).json(exams);
};
