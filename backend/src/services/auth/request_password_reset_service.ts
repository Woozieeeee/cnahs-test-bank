import prisma from "../../lib/prisma";
import { notificationService } from "../notification/notification_service";
import { NotificationType } from "../notification/notification_types";
import { passwordResetRequestQueue } from "../../utils/password_reset_request_queue";

const REQUEST_COOLDOWN_MS = 24 * 60 * 60 * 1000;

async function notifyAdminsOfPasswordResetRequest(
  userId: number,
  userName: string,
  identifier: string,
  role: string,
) {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN", status: "APPROVED" },
    select: { id: true },
  });

  if (admins.length === 0) return;

  await notificationService.createBulkNotifications(
    admins.map((admin) => admin.id),
    {
      type: NotificationType.PASSWORD_RESET_REQUEST,
      title: "Password Reset Request",
      message: `${userName} (${identifier}) requested a password reset. Please coordinate with the Dean's Office.`,
      metadata: {
        userId,
        identifier,
        role,
        timestamp: new Date(),
        actionUrl: "/admin/users",
        priority: "HIGH",
      },
      priority: "HIGH",
    },
  );
}

async function processPasswordResetRequest(identifier: string) {
  const trimmed = identifier.trim();

  if (!trimmed) {
    return { accepted: true };
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ studentId: trimmed }, { username: trimmed }],
    },
    select: {
      id: true,
      name: true,
      role: true,
      status: true,
      studentId: true,
      username: true,
    },
  });

  if (!user) {
    return { accepted: true };
  }

  if (user.status === "REJECTED" || user.status === "DISABLED") {
    return { accepted: true };
  }

  const cooldownSince = new Date(Date.now() - REQUEST_COOLDOWN_MS);

  const existingRequest = await prisma.passwordResetRequest.findFirst({
    where: {
      userId: user.id,
      status: "PENDING",
      createdAt: { gte: cooldownSince },
    },
    orderBy: { createdAt: "desc" },
  });

  if (existingRequest) {
    return { accepted: true };
  }

  await prisma.passwordResetRequest.create({
    data: {
      userId: user.id,
      identifier: trimmed,
      status: "PENDING",
    },
  });

  const displayIdentifier = user.studentId || user.username || trimmed;

  await notifyAdminsOfPasswordResetRequest(
    user.id,
    user.name,
    displayIdentifier,
    user.role,
  );

  return { accepted: true };
}

export async function requestPasswordResetService(identifier: string) {
  return passwordResetRequestQueue.enqueue(() =>
    processPasswordResetRequest(identifier),
  );
}
