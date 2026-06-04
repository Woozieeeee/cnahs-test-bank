import { Request, Response } from "express";

import { assignSectionService } from "../../../../services/admin/academic/student_records/assign_section_service";

export const assignSection = async (req: Request, res: Response) => {
  try {
    const studentRecordId = Number(req.params.id);

    const { sectionId } = req.body;

    const updatedRecord = await assignSectionService({
      studentRecordId,

      sectionId,
    });

    return res.json(updatedRecord);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to assign section.",
    });
  }
};
