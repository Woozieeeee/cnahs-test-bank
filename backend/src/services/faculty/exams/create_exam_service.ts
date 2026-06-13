import prisma from "../../../lib/prisma";

import { CreateExamPayload } from "../../../types/exams/create_exams_payload";
import { facultyNotificationHandler } from "../../notification/faculty_notification_handler";
import { studentNotificationHandler } from "../../notification/student_notification_handler";

interface Props {
  facultyId: number;
  facultyName: string;
  subjectId: number;
  payload: CreateExamPayload;
}

export const createExamService = async ({
  facultyId,
  facultyName,
  subjectId,
  payload,
}: Props) => {
  if (!payload.questionIds?.length) {
    throw new Error("At least one question must be selected.");
  }

  return prisma
    .$transaction(async (tx) => {
      const exam = await tx.exam.create({
        data: {
          title: payload.title,

          description: payload.description,

          examCode: payload.examCode,

          difficulty: payload.difficulty,

          subjectId,

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

          status: "SCHEDULED",

          publishedAt: new Date(),

          createdById: facultyId,

          facultyId: facultyId,

          totalQuestions: payload.questionIds.length,
        },
      });

      await tx.examQuestion.createMany({
        data: payload.questionIds.map((questionId) => ({
          examId: exam.id,
          questionId,
        })),
      });

      await tx.subject.update({
        where: {
          id: subjectId,
        },

        data: {
          totalExams: {
            increment: 1,
          },
        },
      });

      await tx.examDraft.deleteMany({
        where: {
          facultyId,
          subjectId,
        },
      });

      await tx.activityLog.create({
        data: {
          action: "Created exam",

          categories: ["EXAMS"],

          performedBy: facultyName,

          description: `Created exam ${payload.title}`,
        },
      });

      return exam;
    })
    .then((exam) => {
      void facultyNotificationHandler
        .notifyExamCreated(exam.id)
        .catch((error) => {
          console.error(
            "Failed to send faculty exam created notification:",
            error,
          );
        });

      void facultyNotificationHandler
        .notifyExamPublished(exam.id)
        .catch((error) => {
          console.error(
            "Failed to send faculty exam published notification:",
            error,
          );
        });

      void studentNotificationHandler
        .notifyExamScheduled(exam.id)
        .catch((error) => {
          console.error(
            "Failed to send student exam scheduled notifications:",
            error,
          );
        });

      return exam;
    });
};
