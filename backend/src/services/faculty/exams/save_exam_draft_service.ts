import prisma from "../../../lib/prisma";

interface SaveExamDraftParams {
  facultyId: number;

  subjectId: number;

  currentStep: number;

  title?: string;

  draftData: any;
}

export const saveExamDraftService = async ({
  facultyId,
  subjectId,
  currentStep,
  title,
  draftData,
}: SaveExamDraftParams) => {
  return prisma.examDraft.upsert({
    where: {
      facultyId_subjectId: {
        facultyId,
        subjectId,
      },
    },

    update: {
      currentStep,

      title,

      draftData,
    },

    create: {
      facultyId,

      subjectId,

      currentStep,

      title,

      draftData,
    },
  });
};
