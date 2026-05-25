import prisma from "../../lib/prisma";

interface ActivityLogData {
  action: string;

  performedBy: string;

  targetUser?: string;

  categories?: string[];

  severity?: string;

  description?: string;

  metadata?: any;
}

export const createActivityLog = async ({
  action,

  performedBy,

  targetUser,

  categories = ["APPROVALS", "SYSTEM"],

  severity = "INFO",

  description,

  metadata,
}: ActivityLogData) => {
  return prisma.activityLog.create({
    data: {
      action,

      performedBy,

      targetUser,

      categories,

      severity,

      description,

      metadata,
    },
  });
};
