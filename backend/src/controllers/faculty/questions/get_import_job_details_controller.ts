import { Request, Response } from "express";

import { getImportJobDetailsService } from "../../../services/faculty/questions/get_import_job_details_service";

export const getImportJobDetailsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const facultyId = (req as any).user.id;

    const jobId = Number(req.params.jobId);

    if (Number.isNaN(jobId)) {
      return res.status(400).json({
        message: "Invalid import job id.",
      });
    }

    const job = await getImportJobDetailsService(facultyId, jobId);

    return res.json(job);
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: error.message || "Failed to load import details.",
    });
  }
};
