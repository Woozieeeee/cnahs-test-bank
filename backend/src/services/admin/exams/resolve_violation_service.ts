import prisma from "../../../lib/prisma";

export const resolveViolationService = async (
  violationId: number,
  resolvedBy: string,
  notes?: string,
) => {
  const violation = await prisma.examViolation.findUnique({
    where: { id: violationId },
  });

  if (!violation) {
    throw new Error("Violation not found");
  }

  const updated = await prisma.examViolation.update({
    where: { id: violationId },
    data: {
      resolved: true,
      resolvedAt: new Date(),
      resolvedBy,
      description: notes
        ? `${violation.description || ""}\n[Admin Notes]: ${notes}`
        : violation.description,
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          studentId: true,
        },
      },
      exam: {
        select: {
          id: true,
          title: true,
          examCode: true,
        },
      },
    },
  });

  return updated;
};
