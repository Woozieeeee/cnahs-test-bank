import prisma from "../../lib/prisma";

interface ActivityLogData {
  action: string;

  performedBy: string;

  targetUser?: string;
}

export const createActivityLog = async ({
  action,

  performedBy,

  targetUser,
}: ActivityLogData) => {
  return prisma.activityLog.create({
    data: {
      action,

      performedBy,

      targetUser,
    },
  });
};
