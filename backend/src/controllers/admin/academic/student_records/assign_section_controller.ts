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

    const displayName = [
      updatedRecord.firstName,

      updatedRecord.middleName,

      updatedRecord.lastName,

      updatedRecord.suffix,
    ]
      .filter(Boolean)
      .join(" ");

    // =========================
    // ACTIVITY LOG
    // =========================

    await prisma.activityLog.create({
      data: {
        action: "Assigned Student Section",

        categories: ["ACADEMIC"],

        severity: "INFO",

        description: `${displayName} was assigned to ${updatedRecord.section?.name}.`,

        performedBy: "ADMIN",

        targetUser: displayName,
      },
    });

    return res.json(updatedRecord);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to assign section.",
    });
  }
};
