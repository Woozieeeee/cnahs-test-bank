import prisma from "../../../../lib/prisma";

interface CreateSectionData {
  sectionCode: string;

  yearLevel: number;

  program: string;
}

export const createSectionService = async ({
  sectionCode,

  yearLevel,

  program,
}: CreateSectionData) => {
  // =========================
  // CLEAN INPUTS
  // =========================

  const normalizedCode = sectionCode.trim().toUpperCase();

  // =========================
  // GENERATE NAME
  // =========================

  const name = `${program} ${yearLevel}${normalizedCode}`;

  // =========================
  // CHECK DUPLICATE
  // =========================

  const existingSection = await prisma.section.findFirst({
    where: {
      program,

      yearLevel,

      sectionCode: normalizedCode,
    },
  });

  if (existingSection) {
    throw new Error("Section already exists");
  }

  // =========================
  // CREATE SECTION
  // =========================

  const section = await prisma.section.create({
    data: {
      name,

      sectionCode: normalizedCode,

      yearLevel,

      program,
    },
  });

  return section;
};
