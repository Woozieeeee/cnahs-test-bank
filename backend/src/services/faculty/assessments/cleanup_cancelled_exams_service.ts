import prisma from "../../../lib/prisma";

export const cleanupCancelledExamsService = async () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const deletedExams = await prisma.exam.deleteMany({
    where: {
      status: "CANCELLED" as any,
      updatedAt: {
        lt: oneDayAgo,
      },
    },
  });

  return { count: deletedExams.count };
};
