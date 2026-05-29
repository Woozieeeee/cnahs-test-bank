import { Request, Response } from "express";

import { archiveSectionService } from "../../../../services/admin/academic/sections/archive_section_service";

export const archiveSection = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await archiveSectionService(id);

    return res.json({
      message: "Section archived successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
