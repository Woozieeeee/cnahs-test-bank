import { Request, Response } from "express";

import { assignFacultyToSubjectService } from "../../../../services/admin/academic/subjects/assign_faculty_to_subject_service";

export const assignFacultyToSubject = async (req: Request, res: Response) => {
  try {
    const subjectId = Number(req.params.id);

    const { facultyId } = req.body;

    await assignFacultyToSubjectService(subjectId, facultyId);

    return res.json({
      message: "Faculty assigned successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
