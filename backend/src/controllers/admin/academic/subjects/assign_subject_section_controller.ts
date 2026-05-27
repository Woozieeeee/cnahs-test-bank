import { Request, Response } from "express";

import { assignSubjectSectionsService } from "../../../../services/admin/academic/subjects/assign_subject_section_service";

export const assignSubjectSections = async (req: Request, res: Response) => {
  try {
    const subjectId = Number(req.params.id);

    const { sectionIds } = req.body;

    await assignSubjectSectionsService(subjectId, sectionIds);

    return res.json({
      message: "Sections assigned successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
