import { Request, Response } from "express";

import { assignSectionService } from "../../../../services/admin/academic/student_records/assign_section_service";

import prisma from "../../../../lib/prisma";

export const assignSection = async (req: Request, res: Response) => {
  try {
    const studentRecordId = Number(req.params.id);

    const { sectionId } = req.body;

    const updatedRecord = await assignSectionService({
      studentRecordId,

      sectionId,
    });

    // =========================
    // ACTIVITY LOG
    // =========================

    await prisma.activityLog.create({
      data: {
        action: "Assigned Student Section",

        categories: ["ACADEMIC"],

        severity: "INFO",

        description: `${updatedRecord.fullName} was assigned to ${updatedRecord.section?.name}.`,

        performedBy: "ADMIN",

        targetUser: updatedRecord.fullName,
      },
    });

    return res.json(updatedRecord);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to assign section.",
    });
  }
};
