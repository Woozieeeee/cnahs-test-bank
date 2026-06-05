import prisma from "../../../lib/prisma";

export const getImportHistoryService = async (
  facultyId: number,
  topicId: number,
) => {
  return prisma.importJob.findMany({
    where: {
      topicId,
      createdById: facultyId,
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,

      filename: true,

      status: true,

      totalRows: true,

      importedRows: true,

      skippedRows: true,

      createdAt: true,

      completedAt: true,

      fileSize: true,

      mimeType: true,

      batches: {
        select: {
          id: true,

          importedRows: true,

          skippedRows: true,

          completedAt: true,
        },
      },
    },
  });
};
