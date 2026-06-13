import { Request, Response } from "express";

import { unassignSectionService } from "../../../../services/admin/academic/student_records/unassign_section_service";

export const unassignSection = async (req: Request, res: Response) => {
  try {
    const studentRecordId = Number(req.params.id);

    const updatedRecord = await unassignSectionService(studentRecordId);

    return res.json(updatedRecord);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to unassign section.",
    });
  }
};
