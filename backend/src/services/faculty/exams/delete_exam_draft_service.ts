import prisma from "../../../lib/prisma";

export const deleteExamDraftService = async (
  facultyId: number,
  subjectId: number,
) => {
  const draft = await prisma.examDraft.findUnique({
    where: {
      facultyId_subjectId: {
        facultyId,
        subjectId,
      },
    },
  });

  if (!draft) {
    return;
  }

  await prisma.examDraft.delete({
    where: {
      id: draft.id,
    },
  });
};
