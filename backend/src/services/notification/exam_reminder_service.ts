import prisma from "../../lib/prisma";
import { notificationService } from "./notification_service";
import { NotificationType } from "./notification_types";
import { StudentNotificationTemplates } from "./notification_templates";

const COMPLETED_ATTEMPT_STATUSES = [
  "SUBMITTED",
  "AUTO_SUBMITTED",
  "COMPLETED",
] as const;

async function getEligibleStudentIds(
  examId: number,
  sectionId: number,
): Promise<number[]> {
  const students = await prisma.user.findMany({
    where: {
      sectionId,
      role: "STUDENT",
      status: "APPROVED",
    },
    select: { id: true },
  });

  if (students.length === 0) {
    return [];
  }

  const studentIds = students.map((student) => student.id);

  const completedAttempts = await prisma.examAttempt.findMany({
    where: {
      examId,
      studentId: { in: studentIds },
      status: { in: [...COMPLETED_ATTEMPT_STATUSES] },
    },
    select: { studentId: true },
  });

  const completedStudentIds = new Set(
    completedAttempts.map((attempt) => attempt.studentId),
  );

  return studentIds.filter((id) => !completedStudentIds.has(id));
}

async function filterStudentsNeedingReminder(
  examId: number,
  type: NotificationType,
  studentIds: number[],
): Promise<number[]> {
  if (studentIds.length === 0) {
    return [];
  }

  const existing = await prisma.notification.findMany({
    where: {
      userId: { in: studentIds },
      type,
    },
    select: {
      userId: true,
      metadata: true,
    },
  });

  const alreadyNotified = new Set(
    existing
      .filter((notification) => {
        const metadata = notification.metadata as { examId?: number } | null;
        return metadata?.examId === examId;
      })
      .map((notification) => notification.userId),
  );

  return studentIds.filter((studentId) => !alreadyNotified.has(studentId));
}

async function sendStartingSoonReminders(now: Date): Promise<number> {
  const windowEnd = new Date(now.getTime() + 30 * 60 * 1000);

  const exams = await prisma.exam.findMany({
    where: {
      isArchived: false,
      status: { in: ["SCHEDULED", "ONGOING"] },
      startsAt: {
        gt: now,
        lte: windowEnd,
      },
    },
    select: {
      id: true,
      title: true,
      sectionId: true,
      startsAt: true,
    },
  });

  let sentCount = 0;

  for (const exam of exams) {
    if (!exam.startsAt) {
      continue;
    }

    const minutesUntil = Math.max(
      1,
      Math.ceil((exam.startsAt.getTime() - now.getTime()) / 60_000),
    );

    const eligibleStudents = await getEligibleStudentIds(exam.id, exam.sectionId);
    const targetStudents = await filterStudentsNeedingReminder(
      exam.id,
      NotificationType.EXAM_STARTING_SOON,
      eligibleStudents,
    );

    if (targetStudents.length === 0) {
      continue;
    }

    const template = StudentNotificationTemplates.EXAM_STARTING_SOON;
    const message = template.messageTemplate({
      examTitle: exam.title,
      minutesUntilStart: minutesUntil,
    });

    const created = await notificationService.createBulkNotifications(
      targetStudents,
      {
        type: NotificationType.EXAM_STARTING_SOON,
        title: template.title,
        message,
        metadata: {
          examId: exam.id,
          reminderKind: "starting_soon",
          minutesUntilStart: minutesUntil,
          actionUrl: `/student/exam/${exam.id}`,
        },
        priority: "HIGH",
      },
    );

    sentCount += created.length;
  }

  return sentCount;
}

async function sendDeadlineReminders(now: Date): Promise<number> {
  const windowEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const exams = await prisma.exam.findMany({
    where: {
      isArchived: false,
      status: { in: ["SCHEDULED", "ONGOING"] },
      endsAt: {
        gt: now,
        lte: windowEnd,
      },
    },
    select: {
      id: true,
      title: true,
      sectionId: true,
      endsAt: true,
    },
  });

  let sentCount = 0;

  for (const exam of exams) {
    if (!exam.endsAt) {
      continue;
    }

    const hoursRemaining = Math.max(
      1,
      Math.ceil((exam.endsAt.getTime() - now.getTime()) / 3_600_000),
    );

    const eligibleStudents = await getEligibleStudentIds(exam.id, exam.sectionId);
    const targetStudents = await filterStudentsNeedingReminder(
      exam.id,
      NotificationType.DEADLINE_REMINDER,
      eligibleStudents,
    );

    if (targetStudents.length === 0) {
      continue;
    }

    const template = StudentNotificationTemplates.DEADLINE_REMINDER;
    const message = template.messageTemplate({
      examTitle: exam.title,
      hoursRemaining,
    });

    const created = await notificationService.createBulkNotifications(
      targetStudents,
      {
        type: NotificationType.DEADLINE_REMINDER,
        title: template.title,
        message,
        metadata: {
          examId: exam.id,
          reminderKind: "deadline",
          hoursRemaining,
          actionUrl: `/student/exam/${exam.id}`,
        },
        priority: "HIGH",
      },
    );

    sentCount += created.length;
  }

  return sentCount;
}

export async function processExamReminders(): Promise<void> {
  const now = new Date();

  const [startingSoonCount, deadlineCount] = await Promise.all([
    sendStartingSoonReminders(now),
    sendDeadlineReminders(now),
  ]);

  if (startingSoonCount > 0 || deadlineCount > 0) {
    console.log(`[${now.toISOString()}] Exam reminders sent:`);
    if (startingSoonCount > 0) {
      console.log(`  - Starting soon: ${startingSoonCount} notification(s)`);
    }
    if (deadlineCount > 0) {
      console.log(`  - Deadline: ${deadlineCount} notification(s)`);
    }
  }
}
