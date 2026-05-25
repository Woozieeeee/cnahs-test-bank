import prisma from "../../../../lib/prisma";

export const getSectionByIdService = async (id: number) => {
  return prisma.section.findUnique({
    where: {
      id,
    },

    include: {
      users: true,

      exams: true,

      sectionSubjects: {
        include: {
          subject: true,
        },
      },
    },
  });
};
