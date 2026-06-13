import prisma from "../../../lib/prisma";
import { notificationService } from "../../notification/notification_service";
import { adminNotificationHandler } from "../../notification/admin_notification_handler";
import { NotificationType } from "../../notification/notification_types";

export const approveStudentService = async (id: number, adminName?: string) => {
  const existing = await prisma.user.findUnique({ where: { id } });

  if (!existing) {
    throw new Error("Student not found");
  }

  const student = await prisma.user.update({
    where: { id },

    data: {
      status: "APPROVED",
    },
  });

  void notificationService
    .createNotification(student.id, {
      type: NotificationType.ACCOUNT_APPROVED,
      title: "Account Approved",
      message:
        "Your student account has been approved. You can now access exams and course materials.",
      metadata: {
        priority: "HIGH",
        actionUrl: "/student/dashboard",
      },
    })
    .catch((error) => {
      console.error("Failed to notify student of approval:", error);
    });

  void adminNotificationHandler
    .notifyUserAccountStatusChanged(
      student.id,
      existing.status,
      student.status,
      adminName ? `Approved by ${adminName}` : "Approved",
    )
    .catch((error) => {
      console.error("Failed to notify admins of approval:", error);
    });

  return student;
};
