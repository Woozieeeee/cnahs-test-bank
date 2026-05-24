import prisma from "../../../lib/prisma";

interface StudentRecordData {
  studentId: string;

  fullName: string;

  program: string;
}

export const uploadStudentRecordsService = async (
  records: StudentRecordData[],
) => {
  const createdRecords = await prisma.studentRecord.createMany({
    data: records,

    skipDuplicates: true,
  });

  return createdRecords;
};
