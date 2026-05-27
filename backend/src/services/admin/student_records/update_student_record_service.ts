import prisma from "../../../lib/prisma";

interface UpdateStudentRecordData {
  id: number;

  studentId: string;

  firstName: string;

  middleName?: string;

  lastName: string;

  suffix?: string;

  program: string;
}

export const updateStudentRecordService = async ({
  id,

  studentId,

  firstName,

  middleName,

  lastName,

  suffix,

  program,
}: UpdateStudentRecordData) => {
  const existingRecord = await prisma.studentRecord.findFirst({
    where: {
      studentId,

      NOT: {
        id,
      },
    },
  });

  if (existingRecord) {
    throw new Error("Student ID already exists.");
  }

  return prisma.studentRecord.update({
    where: {
      id,
    },

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
