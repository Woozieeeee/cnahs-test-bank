import prisma from "../../../../lib/prisma";

export const archiveSectionService = async (id: number) => {
  const section = await prisma.section.findUnique({
    where: { id },
  });

  if (!section) {
    throw new Error("Section not found");
  }

  return prisma.section.update({
    where: { id },

    data: {
      isArchived: true,
    },
  });
};
