import prisma from "../../../../lib/prisma";

export const getStudentRecordsService = async () => {
  return prisma.studentRecord.findMany({
    include: {
      section: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
