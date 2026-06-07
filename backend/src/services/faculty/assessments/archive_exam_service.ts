import prisma from "../../../lib/prisma";

export const archiveExamService = async (examId: number) => {
  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    select: { status: true },
  });

  if (!exam) {
    throw new Error("Exam not found.");
  }

  if (exam.status === "ONGOING") {
    throw new Error(
      "Cannot archive an ongoing exam. Please wait until the exam is completed.",
    );
  }

  if (exam.status === "DRAFT") {
    throw new Error("Cannot archive a draft exam. Please delete it instead.");
  }

  if (exam.status === "ARCHIVED") {
    throw new Error("Exam is already archived.");
  }

  const updatedExam = await prisma.exam.update({
    where: { id: examId },
    data: { status: "ARCHIVED" },
  });

  return updatedExam;
};
