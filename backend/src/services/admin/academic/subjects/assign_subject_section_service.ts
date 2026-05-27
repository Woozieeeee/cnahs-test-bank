import prisma from "../../../../lib/prisma";

export const assignSubjectSectionsService = async (
  subjectId: number,
  sectionIds: number[],
) => {
  // REMOVE OLD ASSIGNMENTS

  await prisma.sectionSubject.deleteMany({
    where: {
      subjectId,
    },
  });

  // CREATE NEW ASSIGNMENTS

  return prisma.sectionSubject.createMany({
    data: sectionIds.map((sectionId) => ({
      subjectId,
      sectionId,
    })),
  });
};
