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
  // FETCH EXISTING RECORDS
  // =========================

  const studentIds = records
    .map((record) => record.studentId?.trim())
    .filter(Boolean);

  const existingRecords = await prisma.studentRecord.findMany({
    where: {
      studentId: {
        in: studentIds,
      },
    },

    select: {
      studentId: true,
    },
  });

  const existingMap = new Set(
    existingRecords.map((record) => record.studentId),
  );

  // =========================
  // PREPARE BATCHES
  // =========================

  const createData: StudentRecordData[] = [];

  const updateData: StudentRecordData[] = [];

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
    // NORMALIZED DATA
    // =========================

    const studentData = {
      studentId,

      firstName,

      middleName,

      lastName,

      suffix,

      program,
    };

    // =========================
    // EXISTING RECORD
    // =========================

    if (existingMap.has(studentId)) {
      updateData.push(studentData);

      updated++;
    } else {
      createData.push(studentData);

      inserted++;
    }
  }

  // =========================
  // BULK CREATE
  // =========================

  if (createData.length > 0) {
    await prisma.studentRecord.createMany({
      data: createData,

      skipDuplicates: true,
    });
  }

  // =========================
  // BULK UPDATE
  // =========================

  if (updateData.length > 0) {
    await prisma.$transaction(
      updateData.map((record) =>
        prisma.studentRecord.update({
          where: {
            studentId: record.studentId,
          },

          data: {
            firstName: record.firstName,

            middleName: record.middleName,

            lastName: record.lastName,

            suffix: record.suffix,

            program: record.program,
          },
        }),
      ),
    );
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
