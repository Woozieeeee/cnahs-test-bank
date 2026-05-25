import prisma from "../lib/prisma";

interface LogActivityInput {
  action: string;

  categories?: string[];

  severity?: string;

  description?: string;

  performedBy: string;

  targetUser?: string;

  metadata?: any;
}

export const logActivity = async ({
  action,

  categories = ["SYSTEM"],

  severity = "INFO",

  description,

  performedBy,

  targetUser,

  metadata,
}: LogActivityInput) => {
  const log = await prisma.activityLog.create({
    data: {
      action,

      categories,

      severity,

      description,

      performedBy,

      targetUser,

      metadata,
    },
  });

  return log;
};
