import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";
import { isPasswordStrong } from "../../../lib/password_policy";

interface UpdateAdminUserInput {
  userId: number;
  name?: string;
  username?: string;
  status?: string;
  password?: string;
}

const ALLOWED_STATUSES = new Set([
  "PENDING",
  "APPROVED",
  "REJECTED",
  "DISABLED",
]);

export async function updateAdminUserService({
  userId,
  name,
  username,
  status,
  password,
}: UpdateAdminUserInput) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      studentId: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const data: {
    name?: string;
    username?: string;
    status?: string;
    password?: string;
    isFirstLogin?: boolean;
  } = {};

  if (name !== undefined) {
    const trimmed = name.trim();
    if (!trimmed) throw new Error("Name is required");
    data.name = trimmed;
  }

  if (username !== undefined) {
    if (user.role === "STUDENT") {
      throw new Error("Student usernames cannot be changed");
    }

    const trimmed = username.trim();
    if (!trimmed) throw new Error("Username is required");

    const existing = await prisma.user.findFirst({
      where: {
        username: trimmed,
        NOT: { id: userId },
      },
    });

    if (existing) {
      throw new Error("Username already exists");
    }

    data.username = trimmed;
  }

  if (status !== undefined) {
    if (!ALLOWED_STATUSES.has(status)) {
      throw new Error("Invalid account status");
    }

    if (user.role === "ADMIN" && status !== "APPROVED") {
      throw new Error("Admin accounts cannot be disabled or rejected");
    }

    data.status = status;
  }

  if (password !== undefined) {
    const trimmed = password.trim();
    if (!isPasswordStrong(trimmed)) {
      throw new Error(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
      );
    }

    data.password = await bcrypt.hash(trimmed, 10);
    data.isFirstLogin = false;
  }

  if (Object.keys(data).length === 0) {
    throw new Error("No changes provided");
  }

  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      username: true,
      studentId: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
}
