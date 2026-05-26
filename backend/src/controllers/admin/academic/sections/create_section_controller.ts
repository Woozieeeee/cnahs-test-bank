import { Request, Response } from "express";

import { createSectionService } from "../../../../services/admin/academic/sections/create_section_service";

export const createSection = async (req: Request, res: Response) => {
  try {
    const { sectionCode, yearLevel, program } = req.body ?? {};

    if (!sectionCode || !yearLevel || !program) {
      return res.status(400).json({
        message: "sectionCode, yearLevel, and program are required.",
      });
    }

    const section = await createSectionService({
      sectionCode,
      yearLevel: Number(yearLevel),
      program,
    });

    return res.status(201).json(section);
  } catch (error: any) {
    return res.status(400).json({
      message: error?.message || "Failed to create section.",
    });
  }
};
