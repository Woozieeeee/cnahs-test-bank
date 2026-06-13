import { Request, Response } from "express";

import { createExamService } from "../../../services/faculty/exams/create_exam_service";

export const createExamController = async (req: Request, res: Response) => {
  const facultyId = (req as any).user.id;
  const facultyName = (req as any).user.name;

  const subjectId = Number(req.params.subjectId);

  console.log("BODY:", req.body);

  if (!req.body) {
    console.log("No request body received");
  } else {
    console.log("questionIds:", req.body.questionIds);
  }
  console.log("questionIds:", req.body.questionIds);

  const exam = await createExamService({
    facultyId,
    facultyName,
    subjectId,
    payload: req.body,
  });

  res.status(201).json(exam);
};
