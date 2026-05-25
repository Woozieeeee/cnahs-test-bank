import { Request, Response } from "express";

import { getSectionByIdService } from "../../../../services/admin/academic/sections/get_section_by_id_service";

export const getSectionById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const section = await getSectionByIdService(id);

    return res.json(section);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch section.",
    });
  }
};
