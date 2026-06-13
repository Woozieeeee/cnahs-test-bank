import prisma from "../../../../lib/prisma";

interface AssignSectionData {
  studentRecordId: number;

  sectionId: number;
}

export const assignSectionService = async ({
  studentRecordId,

  sectionId,
}: AssignSectionData) => {
  // First, update StudentRecord
  const studentRecord = await prisma.studentRecord.update({
    where: {
      id: studentRecordId,
    },

    data: {
      sectionId,
    },

    include: {
      section: true,
    },
  });

  // Then, update the associated User's sectionId
  // Note: user.sectionId links to Section.id directly
  await prisma.user.update({
    where: {
      studentId: studentRecord.studentId,
    },
    data: {
      sectionId,
    },
  });

  return studentRecord;
};
