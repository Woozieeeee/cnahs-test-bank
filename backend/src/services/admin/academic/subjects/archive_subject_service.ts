import prisma from "../../../../lib/prisma";

export const archiveSubjectService = async (id: number) => {
  const subject = await prisma.subject.findUnique({
    where: { id },
  });

  if (!subject) {
    throw new Error("Subject not found");
  }

  return prisma.subject.update({
    where: { id },

    data: {
      isArchived: true,
    },
  });
};
