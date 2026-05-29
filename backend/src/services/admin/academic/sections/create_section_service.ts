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
  // NORMALIZE SECTION CODE
  // =========================

  const normalizedCode = sectionCode.trim().toUpperCase();

  // =========================
  // GENERATE SECTION NAME
  // =========================

  const name = `${program}-${yearLevel}${normalizedCode}`;

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
    throw new Error("Section already exists.");
  }

  // =========================
  // CREATE SECTION
  // =========================

  return prisma.section.create({
    data: {
      name,

      sectionCode: normalizedCode,

      yearLevel,

      program,
    },
  });
};
