import { Request, Response } from "express";

import { updateSectionService } from "../../../../services/admin/academic/sections/update_section_service";

export const updateSection = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const section = await updateSectionService(id, req.body);

    return res.json(section);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
