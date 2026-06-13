import prisma from "../../../../lib/prisma";

export const unassignSectionService = async (studentRecordId: number) => {
  // First, get the student record to get the studentId
  const studentRecord = await prisma.studentRecord.findUnique({
    where: { id: studentRecordId },
  });

  if (!studentRecord) {
    throw new Error("Student record not found.");
  }

  // Update StudentRecord
  await prisma.studentRecord.update({
    where: { id: studentRecordId },
    data: { sectionId: null },
  });

  // Update User's sectionId to null
  await prisma.user.update({
    where: { studentId: studentRecord.studentId },
    data: { sectionId: null },
  });

  return studentRecord;
};
