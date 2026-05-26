import prisma from "../../../lib/prisma";

interface StudentRecordData {
  studentId: string;

  fullName: string;

  program: string;
}

export const uploadStudentRecordsService = async (
  records: StudentRecordData[],
) => {
  for (const record of records) {
    // =========================
    // SKIP EMPTY ROWS
    // =========================

    if (!record.studentId || !record.fullName) {
      continue;
    }

    // =========================
    // CHECK EXISTING RECORD
    // =========================

    const existingRecord = await prisma.studentRecord.findUnique({
      where: {
        studentId: record.studentId,
      },
    });

    // =========================
    // UPDATE EXISTING
    // =========================

    if (existingRecord) {
      await prisma.studentRecord.update({
        where: {
          studentId: record.studentId,
        },

        data: {
          fullName: record.fullName,

          program: record.program || "BSN",
        },
      });

      continue;
    }

    // =========================
    // CREATE NEW RECORD
    // =========================

    await prisma.studentRecord.create({
      data: {
        studentId: record.studentId,

        fullName: record.fullName,

        program: record.program || "BSN",
      },
    });
  }
};
