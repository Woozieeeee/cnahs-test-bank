import prisma from "../../../../lib/prisma";

interface Props {
  id: number;

  name: string;

  code: string;

  description?: string;
}

export const updateSubjectService = async ({
  id,
  name,
  code,
  description,
}: Props) => {
  const existingSubject = await prisma.subject.findFirst({
    where: {
      code,

      NOT: {
        id,
      },
    },
  });

  if (existingSubject) {
    throw new Error("Subject code already exists.");
  }

  return prisma.subject.update({
    where: {
      id,
    },

    data: {
      name,
      code,
      description,
    },
  });
};
