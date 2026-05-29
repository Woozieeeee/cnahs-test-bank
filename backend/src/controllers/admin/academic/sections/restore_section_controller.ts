import { Request, Response } from "express";

import { restoreSectionService } from "../../../../services/admin/academic/sections/restore_section_service";

export const restoreSection = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await restoreSectionService(id);

    return res.json({
      message: "Section restored successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
