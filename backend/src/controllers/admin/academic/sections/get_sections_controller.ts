import { Request, Response } from "express";

import { getSectionsService } from "../../../../services/admin/academic/sections/get_sections_service";

export const getSections = async (
  req: Request,

  res: Response,
) => {
  try {
    const sections = await getSectionsService();

    return res.json(sections);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch sections.",
    });
  }
};
