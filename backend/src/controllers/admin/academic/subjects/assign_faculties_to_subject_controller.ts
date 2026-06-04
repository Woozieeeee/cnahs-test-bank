import { Request, Response } from "express";

import { assignFacultiesToSubjectService } from "../../../../services/admin/academic/subjects/assign_faculties_to_subject_service";

export const assignFacultiesToSubject = async (req: Request, res: Response) => {
  try {
    const subjectId = Number(req.params.id);

    const { facultyIds } = req.body;

    await assignFacultiesToSubjectService(subjectId, facultyIds);

    return res.json({
      message: "Faculty pool updated successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
