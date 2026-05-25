import { Request, Response } from "express";

import { createSectionService } from "../../../../services/admin/academic/sections/create_section_service";

import { logActivity } from "../../../../utils/log_activity";

export const createSection = async (
  req: Request,

  res: Response,
) => {
  try {
    const {
      name,

      yearLevel,

      program,
    } = req.body;

    const section = await createSectionService({
      name,

      yearLevel,

      program,
    });

    await logActivity({
      action: "Created section",

      categories: ["ACADEMIC", "SECTIONS"],

      severity: "SUCCESS",

      description: `Created ${section.name} section.`,

      performedBy: "Admin",
    });

    return res.json({
      message: "Section created successfully.",

      section,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
