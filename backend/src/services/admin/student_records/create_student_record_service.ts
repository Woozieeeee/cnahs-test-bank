import prisma from "../../../lib/prisma";

import { ACADEMIC_PROGRAMS } from "../../../lib/constants/academic_programs";

interface CreateStudentRecordData {
  studentId: string;

  fullName: string;

  program: string;
}

export const createStudentRecordService = async ({
  studentId,

  fullName,

  program,
}: CreateStudentRecordData) => {
  // =========================
  // VALIDATION
  // =========================

  const studentIdRegex = /^\d{2}-\d{5}$/;

  const fullNameRegex = /^[A-Za-z\s.-]+$/;

  if (!studentIdRegex.test(studentId)) {
    throw new Error("Invalid student ID format");
  }

  if (!fullNameRegex.test(fullName)) {
    throw new Error("Invalid full name");
  }

  if (!ACADEMIC_PROGRAMS.includes(program)) {
    throw new Error("Invalid academic program");
  }

  // =========================
  // DUPLICATE CHECK
  // =========================

  const existingRecord = await prisma.studentRecord.findUnique({
    where: {
      studentId,
    },
  });

  if (existingRecord) {
    throw new Error("Student record already exists");
  }

  // =========================
  // CREATE RECORD
  // =========================

  const record = await prisma.studentRecord.create({
    data: {
      studentId,

      fullName,

      program,
    },
  });

  return record;
};
