import { ACADEMIC_PROGRAMS } from "../../../lib/constants/academic_programs";

import prisma from "../../../lib/prisma";

interface StudentRecordData {
  studentId: string;

  fullName: string;

  program: string;
}

export const uploadStudentRecordsService = async (
  records: StudentRecordData[],
) => {
  // =========================
  // VALID PROGRAMS
  // =========================

  const allowedPrograms = ["BSN"];

  // =========================
  // VALIDATION REGEX
  // =========================

  const studentIdRegex = /^\d{2}-\d{5}$/;

  const fullNameRegex = /^[A-Za-z\s.-]+$/;

  // =========================
  // TRACK RESULTS
  // =========================

  let inserted = 0;

  let updated = 0;

  let skipped = 0;

  const errors: string[] = [];

  // =========================
  // PROCESS RECORDS
  // =========================

  for (const record of records) {
    const studentId = record.studentId?.trim();

    const fullName = record.fullName?.trim();

    const program = record.program?.trim() || "BSN";

    // =========================
    // EMPTY VALUES
    // =========================

    if (!studentId || !fullName) {
      skipped++;

      errors.push(`Missing required fields`);

      continue;
    }

    // =========================
    // INVALID STUDENT ID
    // =========================

    if (!studentIdRegex.test(studentId)) {
      skipped++;

      errors.push(`Invalid student ID: ${studentId}`);

      continue;
    }

    // =========================
    // INVALID NAME
    // =========================

    if (!fullNameRegex.test(fullName)) {
      skipped++;

      errors.push(`Invalid name: ${fullName}`);

      continue;
    }

    // =========================
    // INVALID PROGRAM
    // =========================

    if (!allowedPrograms.includes(program)) {
      skipped++;

      errors.push(`Invalid program: ${program}`);

      continue;
    }

    // =========================
    // CHECK EXISTING
    // =========================

    const existingRecord = await prisma.studentRecord.findUnique({
      where: {
        studentId,
      },
    });

    // =========================
    // UPDATE EXISTING
    // =========================

    if (existingRecord) {
      await prisma.studentRecord.update({
        where: {
          studentId,
        },

        data: {
          fullName,

          program,
        },
      });

      updated++;

      continue;
    }

    // =========================
    // CREATE NEW RECORD
    // =========================

    await prisma.studentRecord.create({
      data: {
        studentId,

        fullName,

        program,
      },
    });

    inserted++;
  }

  // =========================
  // RETURN SUMMARY
  // =========================

  return {
    inserted,

    updated,

    skipped,

    errors,
  };
};
