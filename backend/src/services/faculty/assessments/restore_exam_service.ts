import prisma from "../../../lib/prisma";

export const restoreExamService = async (examId: number) => {
  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    select: { status: true },
  });

  if (!exam) {
    throw new Error("Exam not found.");
  }

  if (exam.status !== "ARCHIVED" && exam.status !== "CANCELLED") {
    throw new Error("Only archived or cancelled exams can be restored.");
  }

  const updatedExam = await prisma.exam.update({
    where: { id: examId },
    data: { status: "SCHEDULED" as any },
  });

  return updatedExam;
};
