/**
 * PHASE 1: STUDENT NOTIFICATION HANDLER
 * Manages notifications for students including:
 * - Exam scheduling and reminders
 * - Exam results and performance feedback
 * - Progress milestones and difficulty unlocks
 * - Enrollment updates
 */

import { PrismaClient } from "@prisma/client";
import { notificationService } from "./notification_service";
import { processExamReminders } from "./exam_reminder_service";
import { NotificationType } from "./notification_types";
import { StudentNotificationTemplates } from "./notification_templates";

const prisma = new PrismaClient();

export class StudentNotificationHandler {
  /**
   * Notify students when exam is scheduled
   */
  async notifyExamScheduled(examId: number): Promise<void> {
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        section: true,
        subject: true,
      },
    });

    if (!exam) return;

    // Get all students in the section
    const students = await prisma.user.findMany({
      where: {
        sectionId: exam.sectionId,
        role: "STUDENT",
      },
    });

    const template = StudentNotificationTemplates.EXAM_SCHEDULED;
    const message = template.messageTemplate({
      examTitle: exam.title,
      examDate: exam.startsAt?.toLocaleDateString() || "TBD",
      duration: exam.duration,
    });

    await notificationService.createBulkNotifications(
      students.map((s) => s.id),
      {
        type: NotificationType.EXAM_SCHEDULED,
        title: template.title,
        message,
        metadata: {
          examId,
          subject: exam.subject.name,
          actionUrl: `/student/exam/${examId}`,
        },
        priority: "HIGH",
      }
    );
  }

  /**
   * Send reminder when exam is starting soon (30 min before).
   * Prefer the background scheduler; this is kept for manual/on-demand use.
   */
  async notifyExamStartingSoon(_examId: number): Promise<void> {
    await processExamReminders();
  }

  /**
   * Notify student when exam results are published
   */
  async notifyExamResultPublished(attemptId: number): Promise<void> {
    const attempt = await prisma.examAttempt.findUnique({
      where: { id: attemptId },
      include: {
        exam: true,
        student: true,
      },
    });

    if (!attempt) return;

    const passed = (attempt.score / attempt.exam.totalQuestions) * 100 >= attempt.exam.passingScore;
    const percentage = Math.round(
      ((attempt.score / attempt.exam.totalQuestions) * 100)
    );

    const template = StudentNotificationTemplates.EXAM_RESULT_PUBLISHED;
    const message = template.messageTemplate({
      examTitle: attempt.exam.title,
      passed,
      score: attempt.score,
      totalScore: attempt.exam.totalQuestions,
      percentage,
    });

    await notificationService.createNotification(attempt.student.id, {
      type: NotificationType.EXAM_RESULT_PUBLISHED,
      title: template.title,
      message,
      metadata: {
        examId: attempt.exam.id,
        score: attempt.score,
        passingScore: attempt.exam.passingScore,
        actionUrl: `/student/exam/${attempt.exam.id}/results`,
      },
      priority: "HIGH",
    });
  }

  /**
   * Notify student when exam attempt is flagged
   */
  async notifyExamFlagged(violationId: number): Promise<void> {
    const violation = await prisma.examViolation.findUnique({
      where: { id: violationId },
      include: {
        exam: true,
        student: true,
      },
    });

    if (!violation) return;

    const template = StudentNotificationTemplates.EXAM_ATTEMPT_FLAGGED;
    const message = template.messageTemplate({
      examTitle: violation.exam.title,
      reason: violation.description || violation.type,
    });

    await notificationService.createNotification(violation.student.id, {
      type: NotificationType.EXAM_ATTEMPT_FLAGGED,
      title: template.title,
      message,
      metadata: {
        examId: violation.exam.id,
        violationType: violation.type,
        severity: (violation.severity as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL") || "MEDIUM",
        actionUrl: `/student/exam/${violation.exam.id}/status`,
      },
      priority: "MEDIUM",
    });
  }

  /**
   * Notify student of progress milestone
   */
  async notifyProgressMilestone(
    studentId: number,
    subject: string,
    difficulty: string
  ): Promise<void> {
    const template = StudentNotificationTemplates.PROGRESS_MILESTONE;
    const message = template.messageTemplate({
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      subject,
    });

    await notificationService.createNotification(studentId, {
      type: NotificationType.PROGRESS_MILESTONE,
      title: template.title,
      message,
      metadata: {
        subject,
        difficulty,
        actionUrl: `/student/progress`,
      },
      priority: "MEDIUM",
    });
  }

  /**
   * Notify student when difficulty level is unlocked
   */
  async notifyDifficultyUnlocked(
    studentId: number,
    subject: string,
    currentDifficulty: string,
    nextDifficulty: string
  ): Promise<void> {
    const template = StudentNotificationTemplates.DIFFICULTY_LEVEL_UNLOCK;
    const message = template.messageTemplate({
      currentDifficulty:
        currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1),
      nextDifficulty:
        nextDifficulty.charAt(0).toUpperCase() + nextDifficulty.slice(1),
      subject,
    });

    await notificationService.createNotification(studentId, {
      type: NotificationType.DIFFICULTY_LEVEL_UNLOCK,
      title: template.title,
      message,
      metadata: {
        subject,
        currentDifficulty,
        nextDifficulty,
        actionUrl: `/student/subjects/${subject}`,
      },
      priority: "HIGH",
    });
  }

  /**
   * Alert student of low performance
   */
  async notifyLowPerformance(
    studentId: number,
    subject: string,
    averageScore: number
  ): Promise<void> {
    if (averageScore < 75) {
      const template = StudentNotificationTemplates.LOW_PERFORMANCE_ALERT;
      const message = template.messageTemplate({ subject });

      await notificationService.createNotification(studentId, {
        type: NotificationType.LOW_PERFORMANCE_ALERT,
        title: template.title,
        message,
        metadata: {
          subject,
          averageScore,
          actionUrl: `/student/progress`,
        },
        priority: "MEDIUM",
      });
    }
  }

  /**
   * Notify student of new subject enrollment
   */
  async notifyNewSubjectEnrollment(
    studentId: number,
    subjectId: number
  ): Promise<void> {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) return;

    const template = StudentNotificationTemplates.NEW_SUBJECT_ENROLLED;
    const message = template.messageTemplate({
      subjectName: subject.name,
    });

    await notificationService.createNotification(studentId, {
      type: NotificationType.NEW_SUBJECT_ENROLLED,
      title: template.title,
      message,
      metadata: {
        subjectId,
        actionUrl: `/student/subjects/${subjectId}`,
      },
      priority: "MEDIUM",
    });
  }

  /**
   * Send deadline reminder (within 24 hours of exam end).
   * Prefer the background scheduler; this is kept for manual/on-demand use.
   */
  async notifyDeadlineReminder(_examId: number): Promise<void> {
    await processExamReminders();
  }
}

export const studentNotificationHandler = new StudentNotificationHandler();
