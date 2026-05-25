import prisma from "../../../lib/prisma";

export const approveStudentService = async (id: number, adminName?: string) => {
  const student = await prisma.user.update({
    where: { id },

    data: {
      status: "APPROVED",
    },
  });

  return student;
};
