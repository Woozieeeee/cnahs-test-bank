import prisma from "../../../lib/prisma";

import { CreateExamPayload } from "../../../types/exams/create_exams_payload";

interface Props {
  facultyId: number;
  subjectId: number;
  examId: number;
  payload: CreateExamPayload;
}

export const updateExamService = async ({
  facultyId,
  subjectId,
  examId,
  payload,
}: Props) => {
  // Verify faculty owns this subject
  const subject = await prisma.subject.findFirst({
    where: {
      id: subjectId,
      faculties: {
        some: {
          facultyId,
        },
      },
    },
  });

  if (!subject) {
    throw new Error("Subject not found or unauthorized");
  }

  // Verify exam exists and belongs to faculty
  const exam = await prisma.exam.findFirst({
    where: {
      id: examId,
      subjectId,
      createdById: facultyId,
    },
  });

  if (!exam) {
    throw new Error("Exam not found or unauthorized");
  }

  if (!payload.questionIds?.length) {
    throw new Error("At least one question must be selected.");
  }

  return prisma.$transaction(async (tx) => {
    // Delete existing exam questions
    await tx.examQuestion.deleteMany({
      where: {
        examId,
      },
    });

    // Update exam
    const updatedExam = await tx.exam.update({
      where: { id: examId },
      data: {
        title: payload.title,
        description: payload.description,
        difficulty: payload.difficulty,
        sectionId: payload.sectionIds[0],
        duration: payload.duration,
        passingScore: payload.passingScore,
        startsAt: new Date(payload.startsAt),
        endsAt: new Date(payload.endsAt),
        randomizeQuestions: payload.randomizeQuestions,
        randomizeOptions: payload.randomizeAnswers,
        showResultAfterSubmission: payload.showResultAfterSubmission,
        showCorrectAnswers: payload.showCorrectAnswers,
        showExplanations: payload.showExplanations,
        requireFullscreen: payload.requireFullscreen,
        detectTabSwitch: payload.detectTabSwitch,
        detectWindowBlur: payload.detectWindowBlur,
        blockCopy: payload.blockCopy,
        blockPaste: payload.blockPaste,
        blockRightClick: payload.blockRightClick,
        detectDeviceChange: payload.detectDeviceChange,
        violationThreshold: payload.violationThreshold,
        thresholdAction: payload.thresholdAction,
      },
    });

    // Re-associate questions
    await tx.examQuestion.createMany({
      data: payload.questionIds.map((questionId, index) => ({
        examId,
        questionId,
        displayOrder: index + 1,
      })),
    });

    // Update subject exam count
    const examCount = await tx.examQuestion.count({
      where: { examId },
    });

    await tx.exam.update({
      where: { id: examId },
      data: { totalQuestions: examCount },
    });

    return updatedExam;
  });
};
