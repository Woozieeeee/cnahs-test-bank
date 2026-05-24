import prisma from "../../../lib/prisma";

import { createActivityLog } from "../../activity/create_activity_log_service";

export const approveStudentService = async (id: number, adminName?: string) => {
  const student = await prisma.user.update({
    where: { id },

    data: {
      status: "APPROVED",
    },
  });

  await createActivityLog({
    action: "Approved student account",

    performedBy: adminName || "Admin",

    targetUser: student.name,
  });

  return student;
};
