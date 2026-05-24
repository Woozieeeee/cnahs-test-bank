import prisma from "../../../lib/prisma";

import { createActivityLog } from "../../activity/create_activity_log_service";

export const rejectStudentService = async (id: number, adminName?: string) => {
  const student = await prisma.user.update({
    where: {
      id,
    },

    data: {
      status: "REJECTED",
    },
  });

  await createActivityLog({
    action: "Rejected student account",

    performedBy: adminName || "Admin",

    targetUser: student.name,
  });

  return student;
};
