import prisma from "../lib/prisma";

interface LogActivityInput {
  action: string;

  category?: string;

  severity?: string;

  description?: string;

  performedBy: string;

  targetUser?: string;

  metadata?: any;
}

export const logActivity = async ({
  action,

  category = "SYSTEM",

  severity = "INFO",

  description,

  performedBy,

  targetUser,

  metadata,
}: LogActivityInput) => {
  const log = await prisma.activityLog.create({
    data: {
      action,

      category,

      severity,

      description,

      performedBy,

      targetUser,

      metadata,
    },
  });

  return log;
};
