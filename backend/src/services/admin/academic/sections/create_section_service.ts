import prisma from "../../../../lib/prisma";

interface CreateSectionData {
  name: string;

  yearLevel: number;

  program: string;
}

export const createSectionService = async ({
  name,

  yearLevel,

  program,
}: CreateSectionData) => {
  const existingSection = await prisma.section.findUnique({
    where: {
      name,
    },
  });

  if (existingSection) {
    throw new Error("Section already exists.");
  }

  return prisma.section.create({
    data: {
      name,

      yearLevel,

      program,
    },
  });
};
