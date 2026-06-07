import prisma from "../../../lib/prisma";

export const restoreExamService = async (examId: number) => {
  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    select: { status: true },
  });

  if (!exam) {
    throw new Error("Exam not found.");
  }

  if (exam.status !== "ARCHIVED") {
    throw new Error("Only archived exams can be restored.");
  }

  const updatedExam = await prisma.exam.update({
    where: { id: examId },
    data: { status: "COMPLETED" },
  });

  return updatedExam;
};
