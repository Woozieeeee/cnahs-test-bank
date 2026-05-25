import prisma from "../../../lib/prisma";

export const rejectStudentService = async (id: number, adminName?: string) => {
  const student = await prisma.user.update({
    where: {
      id,
    },

    data: {
      status: "REJECTED",
    },
  });

  return student;
};
