import prisma from "../../../lib/prisma";

export const cancelExamService = async (examId: number) => {
  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    select: { status: true },
  });

  if (!exam) {
    throw new Error("Exam not found.");
  }

  if (exam.status !== "SCHEDULED") {
    throw new Error("Only scheduled exams can be cancelled.");
  }

  const updatedExam = await prisma.exam.update({
    where: { id: examId },
    data: { status: "CANCELLED" as any },
  });

  return updatedExam;
};
