import prisma from "../../../lib/prisma";

export const getExamDraftService = async (
  facultyId: number,
  subjectId: number,
) => {
  return prisma.examDraft.findUnique({
    where: {
      facultyId_subjectId: {
        facultyId,
        subjectId,
      },
    },
  });
};
