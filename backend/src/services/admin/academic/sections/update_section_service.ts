import prisma from "../../../../lib/prisma";

interface UpdateSectionData {
  name: string;

  sectionCode: string;

  yearLevel: number;

  program: string;
}

export const updateSectionService = async (
  id: number,
  data: UpdateSectionData,
) => {
  const existingSection = await prisma.section.findUnique({
    where: { id },
  });

  if (!existingSection) {
    throw new Error("Section not found");
  }

  const generatedName = `${data.program}-${data.yearLevel}${data.sectionCode}`;

  return prisma.section.update({
    where: { id },

    data: {
      name: generatedName,

      sectionCode: data.sectionCode,

      yearLevel: data.yearLevel,

      program: data.program,
    },
  });
};
