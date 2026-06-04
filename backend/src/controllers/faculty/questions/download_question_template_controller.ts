import { Request, Response } from "express";

export const downloadQuestionTemplateController = (
  req: Request,
  res: Response,
) => {
  const csv = [
    "question,optionA,optionB,optionC,optionD,correctAnswer,difficulty,explanation",

    '"What is HTML?","Programming Language","Markup Language","Database","Operating System","Markup Language","EASY","HTML is a markup language."',

    '"What is CSS?","Database","Styling Language","Backend Framework","Server","Styling Language","EASY","CSS is used for styling."',
  ].join("\n");

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=question_template.csv",
  );

  res.setHeader("Content-Type", "text/csv");

  return res.send(csv);
};
