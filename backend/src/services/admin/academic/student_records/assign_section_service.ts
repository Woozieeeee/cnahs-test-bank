import prisma from "../../../../lib/prisma";

interface AssignSectionData {
  studentRecordId: number;

  sectionId: number;
}

export const assignSectionService = async ({
  studentRecordId,

  sectionId,
}: AssignSectionData) => {
  return prisma.studentRecord.update({
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
};
