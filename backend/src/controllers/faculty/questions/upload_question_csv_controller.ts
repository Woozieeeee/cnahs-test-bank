import { Request, Response } from "express";

import fs from "fs";
import fsPromises from "fs/promises";
import csv from "csv-parser";

import { CsvQuestionRow } from "../../../types/csv_question";

import { uploadQuestionCsvService } from "../../../services/faculty/questions/upload_question_csv_service";

export const uploadQuestionCsvController = async (
  req: Request,
  res: Response,
) => {
  const topicId = Number(req.params.topicId);

  const facultyId = (req as any).user.id;

  if (!req.file) {
    return res.status(400).json({
      message: "CSV file is required.",
    });
  }

  const file = req.file;

  try {
    if (!file.originalname.toLowerCase().endsWith(".csv")) {
      await fsPromises.unlink(file.path).catch(() => {});

      return res.status(400).json({
        message: "Only CSV files are allowed.",
      });
    }

    const rows: CsvQuestionRow[] = [];

    let headerValidated = false;

    const requiredColumns = [
      "question",
      "optionA",
      "optionB",
      "optionC",
      "optionD",
      "correctAnswer",
      "difficulty",
    ];

    fs.createReadStream(file.path)
      .pipe(csv())

      .on("data", (data) => {
        if (!headerValidated) {
          const columns = Object.keys(data);

          const missingColumns = requiredColumns.filter(
            (column) => !columns.includes(column),
          );

          if (missingColumns.length > 0) {
            throw new Error(`Missing columns: ${missingColumns.join(", ")}`);
          }

          headerValidated = true;
        }

        rows.push({
          question: data.question,
          optionA: data.optionA,
          optionB: data.optionB,
          optionC: data.optionC,
          optionD: data.optionD,
          correctAnswer: data.correctAnswer,
          difficulty: data.difficulty,
          explanation: data.explanation,
        });
      })

      .on("end", async () => {
        try {
          const summary = await uploadQuestionCsvService({
            facultyId,
            topicId,
            file,
            rows,
          });

          return res.json({
            message: "Questions uploaded successfully.",
            ...summary,
          });
        } catch (error: any) {
          return res.status(500).json({
            message: error.message || "Failed to process CSV.",
          });
        } finally {
          await fsPromises.unlink(file.path).catch(() => {});
        }
      })

      .on("error", async () => {
        await fsPromises.unlink(file.path).catch(() => {});

        return res.status(400).json({
          message: "Invalid CSV file.",
        });
      });
  } catch (error: any) {
    await fsPromises.unlink(file.path).catch(() => {});

    return res.status(500).json({
      message: error.message || "Failed to upload questions.",
    });
  }
};
