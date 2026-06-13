import { Role } from "@prisma/client";

import prisma from "../../lib/prisma";
import { getFacultyExamPreferencesService } from "../faculty/settings/faculty_exam_preferences_service";
import { getFacultyNotificationSettingsService } from "../faculty/settings/faculty_notification_settings_service";
import { getStudentPreferencesService } from "../student/settings/student_preferences_service";
import { getSystemSettingsService } from "../admin/settings/get_system_settings_service";
import { NotificationType } from "./notification_types";

const EXAM_REMINDER_TYPES = new Set<string>([
  NotificationType.EXAM_STARTING_SOON,
  NotificationType.DEADLINE_REMINDER,
]);

const STUDENT_PROGRESS_TYPES = new Set<string>([
  NotificationType.PROGRESS_MILESTONE,
  NotificationType.DIFFICULTY_LEVEL_UNLOCK,
  NotificationType.LOW_PERFORMANCE_ALERT,
]);

const FACULTY_EXAM_TYPES = new Set<string>([
  NotificationType.EXAM_CREATED,
  NotificationType.EXAM_PUBLISHED,
  NotificationType.EXAM_STARTED,
  NotificationType.EXAM_COMPLETED_FACULTY,
  NotificationType.STUDENT_SUBMISSION_RECEIVED,
  NotificationType.EXAM_PERFORMANCE_SUMMARY,
]);

const FACULTY_VIOLATION_TYPES = new Set<string>([
  NotificationType.VIOLATION_DETECTED,
]);

const FACULTY_PROGRESS_TYPES = new Set<string>([
  NotificationType.STUDENT_PERFORMANCE_ALERT,
]);

const ADMIN_CRITICAL_TYPES = new Set<string>([
  NotificationType.EXAM_VIOLATION_ESCALATION,
  NotificationType.SECURITY_ALERT,
  NotificationType.SYSTEM_ERROR_LOGGED,
  NotificationType.SUSPICIOUS_ACTIVITY_DETECTED,
  NotificationType.PASSWORD_RESET_REQUEST,
]);

async function shouldDeliverToStudent(
  studentId: number,
  type: string,
): Promise<boolean> {
  const preferences = await getStudentPreferencesService(studentId);

  if (!preferences.pushNotifications) {
    return false;
  }

  if (EXAM_REMINDER_TYPES.has(type)) {
    return preferences.examReminders;
  }

  if (STUDENT_PROGRESS_TYPES.has(type)) {
    return preferences.studyGoals;
  }

  return true;
}

async function shouldDeliverToFaculty(
  facultyId: number,
  type: string,
): Promise<boolean> {
  const [notificationSettings, examPreferences] = await Promise.all([
    getFacultyNotificationSettingsService(facultyId),
    getFacultyExamPreferencesService(facultyId),
  ]);

  if (!notificationSettings.inAppNotifications) {
    return false;
  }

  if (FACULTY_VIOLATION_TYPES.has(type)) {
    return examPreferences.violationAlerts;
  }

  if (FACULTY_EXAM_TYPES.has(type)) {
    return examPreferences.examNotifications;
  }

  if (FACULTY_PROGRESS_TYPES.has(type)) {
    return examPreferences.studentProgressUpdates;
  }

  return notificationSettings.dashboardAlerts;
}

async function shouldDeliverToAdmin(
  type: string,
  priority?: "LOW" | "MEDIUM" | "HIGH",
): Promise<boolean> {
  const settings = await getSystemSettingsService();

  if (ADMIN_CRITICAL_TYPES.has(type)) {
    return settings.criticalSystemAlerts;
  }

  if (type === NotificationType.SYSTEM_ALERT && priority === "HIGH") {
    return settings.criticalSystemAlerts;
  }

  if (!settings.inAppNotifications) {
    return false;
  }

  return settings.dashboardAlerts;
}

export async function shouldDeliverNotification(
  userId: number,
  type: string,
  priority?: "LOW" | "MEDIUM" | "HIGH",
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user) {
    return false;
  }

  switch (user.role) {
    case Role.STUDENT:
      return shouldDeliverToStudent(userId, type);
    case Role.FACULTY:
      return shouldDeliverToFaculty(userId, type);
    case Role.ADMIN:
      return shouldDeliverToAdmin(type, priority);
    default:
      return true;
  }
}

export async function filterDeliverableUserIds(
  userIds: number[],
  type: string,
  priority?: "LOW" | "MEDIUM" | "HIGH",
): Promise<number[]> {
  const results = await Promise.all(
    userIds.map(async (userId) => ({
      userId,
      allowed: await shouldDeliverNotification(userId, type, priority),
    })),
  );

  return results.filter((result) => result.allowed).map((result) => result.userId);
}
