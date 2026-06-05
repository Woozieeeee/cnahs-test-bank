import prisma from "../../../lib/prisma";

export const getImportJobDetailsService = async (
  facultyId: number,
  jobId: number,
) => {
  const job = await prisma.importJob.findFirst({
    where: {
      id: jobId,

      createdById: facultyId,
    },

    include: {
      batches: {
        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,

          filename: true,

          totalRows: true,

          importedRows: true,

          skippedRows: true,

          createdAt: true,

          completedAt: true,
        },
      },
    },
  });

  if (!job) {
    throw new Error("Import job not found.");
  }

  return job;
};
