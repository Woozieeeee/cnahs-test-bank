import { Request, Response } from "express";
import {
  pauseExamService,
  endExamService,
  flagStudentService,
  unlockStudentService,
  notifyStudentService,
  exportExamReportService,
} from "../../../services/faculty/exams/exam_actions_service";
import { markViolationResolvedService } from "../../../services/faculty/exams/exam_violations_service";
import prisma from "../../../lib/prisma";
import { notificationService } from "../../../services/notification/notification_service";
import { NotificationType } from "../../../services/notification/notification_types";

export const pauseExamController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const examId = parseInt(req.params.examId as string);

    const result = await pauseExamService(examId, facultyId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Failed to pause exam:", error);
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const endExamController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const examId = parseInt(req.params.examId as string);
    const { force } = req.body;

    const result = await endExamService(examId, facultyId, force);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Failed to end exam:", error);
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const flagStudentController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const examId = parseInt(req.params.examId as string);
    const { studentId, reason } = req.body;

    const result = await flagStudentService(examId, facultyId, studentId, reason);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Failed to flag student:", error);
    const errorMessage = (error as Error).message;
    if (errorMessage.includes("not found") || errorMessage.includes("not actively")) {
      return res.status(404).json({ message: errorMessage });
    }
    return res.status(400).json({
      message: errorMessage,
    });
  }
};

export const unlockStudentController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const examId = parseInt(req.params.examId as string);
    const { studentId } = req.body;

    const result = await unlockStudentService(examId, facultyId, studentId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Failed to unlock student:", error);
    const errorMessage = (error as Error).message;
    if (errorMessage.includes("not found")) {
      return res.status(404).json({ message: errorMessage });
    }
    return res.status(400).json({
      message: errorMessage,
    });
  }
};

export const notifyStudentController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const examId = parseInt(req.params.examId as string);
    const { studentId, message } = req.body;

    const result = await notifyStudentService(examId, facultyId, studentId, message);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Failed to notify student:", error);
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const exportExamReportController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const examId = parseInt(req.params.examId as string);

    const reportData = await exportExamReportService(examId, facultyId);
    return res.status(200).json(reportData);
  } catch (error) {
    console.error("Failed to export exam report:", error);
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const markViolationResolvedController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const violationId = parseInt(req.params.violationId as string);

    const result = await markViolationResolvedService(violationId, facultyId, `Faculty ${facultyId}`);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Failed to mark violation as resolved:", error);
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const resetViolationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const examId = parseInt(req.params.examId as string);

    // Verify exam ownership
    const exam = await prisma.exam.findFirst({
      where: {
        id: examId,
        OR: [{ createdById: facultyId }, { facultyId }],
      },
    });

    if (!exam) {
      return res.status(403).json({
        message: "Exam not found or unauthorized",
      });
    }

    // Reset all violations for this exam
    const result = await prisma.examViolation.updateMany({
      where: { examId },
      data: {
        resolved: true,
        resolvedAt: new Date(),
        resolvedBy: `Faculty ${facultyId}`,
      },
    });

    return res.status(200).json({
      success: true,
      message: "All violations reset successfully",
      count: result.count,
    });
  } catch (error) {
    console.error("Failed to reset violations:", error);
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const sendAnnouncementController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user.id;
    const examId = parseInt(req.params.examId as string);
    const { message } = req.body;

    // Verify exam ownership
    const exam = await prisma.exam.findFirst({
      where: {
        id: examId,
        OR: [{ createdById: facultyId }, { facultyId }],
      },
      include: {
        attempts: {
          select: {
            studentId: true,
          },
        },
      },
    });

    if (!exam) {
      return res.status(403).json({
        message: "Exam not found or unauthorized",
      });
    }

    const studentIds = exam.attempts.map((attempt) => attempt.studentId);
    const notifications = await notificationService.createBulkNotifications(
      studentIds,
      {
        type: NotificationType.EXAM_ANNOUNCEMENT,
        title: `Announcement from ${exam.title}`,
        message,
        metadata: {
          examId,
          facultyId,
          timestamp: new Date(),
        },
        priority: "MEDIUM",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Announcement sent successfully",
      sentTo: notifications.length,
    });
  } catch (error) {
    console.error("Failed to send announcement:", error);
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};
