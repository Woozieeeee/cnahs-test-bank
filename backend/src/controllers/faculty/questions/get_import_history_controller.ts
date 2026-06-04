import { Request, Response } from "express";

import { getImportHistoryService } from "../../../services/faculty/questions/get_import_history_service";

export const getImportHistoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const facultyId = (req as any).user.id;

    const topicId = Number(req.params.topicId);

    const history = await getImportHistoryService(facultyId, topicId);

    return res.json(history);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to load import history.",
    });
  }
};
