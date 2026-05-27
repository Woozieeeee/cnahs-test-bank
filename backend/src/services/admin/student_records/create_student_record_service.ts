import prisma from "../../../lib/prisma";

interface CreateStudentRecordData {
  studentId: string;

  firstName: string;

  middleName?: string;

  lastName: string;

  suffix?: string;

  program: string;
}

export const createStudentRecordService = async ({
  studentId,

  firstName,

  middleName,

  lastName,

  suffix,

  program,
}: CreateStudentRecordData) => {
  const existingRecord = await prisma.studentRecord.findUnique({
    where: {
      studentId,
    },
  });

  if (existingRecord) {
    throw new Error("Student record already exists.");
  }

  return prisma.studentRecord.create({
    data: {
      studentId,

      firstName,

      middleName,

      lastName,

      suffix,

      program,
    },
  });
};
