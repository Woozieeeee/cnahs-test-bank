import prisma from "../../../../lib/prisma";

interface Props {
  name: string;

  code: string;

  description?: string;
}

export const createSubjectService = async ({
  name,
  code,
  description,
}: Props) => {
  const existingSubject = await prisma.subject.findUnique({
    where: {
      code,
    },
  });

  if (existingSubject) {
    throw new Error("Subject code already exists.");
  }

  return prisma.subject.create({
    data: {
      name,
      code,
      description,
    },
  });
};
