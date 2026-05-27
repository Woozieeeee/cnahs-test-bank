import prisma from "../../../lib/prisma";
import { PROGRAMS } from "../../../lib/constants/programs";

interface StudentRecordData {
  studentId: string;

  firstName: string;

  middleName?: string;

  lastName: string;

  suffix?: string;

  program: string;
}

export const uploadStudentRecordsService = async (
  records: StudentRecordData[],
) => {
  // =========================
  // VALID PROGRAMS
  // =========================

  const allowedPrograms = PROGRAMS;

  // =========================
  // VALIDATION REGEX
  // =========================

  const studentIdRegex = /^\d{2}-\d{5}$/;

  const nameRegex = /^[A-Za-z\s.-]+$/;

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

    const firstName = record.firstName?.trim();

    const middleName = record.middleName?.trim();

    const lastName = record.lastName?.trim();

    const suffix = record.suffix?.trim();

    const program = record.program?.trim() || "BSN";

    // =========================
    // EMPTY VALUES
    // =========================

    if (!studentId || !firstName || !lastName) {
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
    // INVALID FIRST NAME
    // =========================

    if (!nameRegex.test(firstName)) {
      skipped++;

      errors.push(`Invalid first name: ${firstName}`);

      continue;
    }

    // =========================
    // INVALID LAST NAME
    // =========================

    if (!nameRegex.test(lastName)) {
      skipped++;

      errors.push(`Invalid last name: ${lastName}`);

      continue;
    }

    // =========================
    // INVALID MIDDLE NAME
    // =========================

    if (middleName && !nameRegex.test(middleName)) {
      skipped++;

      errors.push(`Invalid middle name: ${middleName}`);

      continue;
    }

    // =========================
    // INVALID SUFFIX
    // =========================

    if (suffix && !nameRegex.test(suffix)) {
      skipped++;

      errors.push(`Invalid suffix: ${suffix}`);

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
          firstName,

          middleName,

          lastName,

          suffix,

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

        firstName,

        middleName,

        lastName,

        suffix,

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
