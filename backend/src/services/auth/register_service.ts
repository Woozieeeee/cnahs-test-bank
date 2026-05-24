import prisma from "../../lib/prisma";

import bcrypt from "bcryptjs";

import { normalizeName } from "../../utils/normalize_name";

interface RegisterData {
  name: string;

  studentId: string;

  password: string;
}

export const registerService = async ({
  name,
  studentId,
  password,
}: RegisterData) => {
  // =========================
  // CHECK EXISTING USER
  // =========================

  const existingUser = await prisma.user.findUnique({
    where: {
      studentId,
    },
  });

  if (existingUser) {
    throw new Error("Student already registered");
  }

  // =========================
  // FIND OFFICIAL RECORD
  // =========================

  const studentRecord = await prisma.studentRecord.findUnique({
    where: {
      studentId,
    },
  });

  // =========================
  // RECORD NOT FOUND
  // =========================

  if (!studentRecord) {
    throw new Error("Student record not found");
  }

  // =========================
  // NORMALIZE NAMES
  // =========================

  const normalizedInputName = normalizeName(name);

  const normalizedRecordName = normalizeName(studentRecord.fullName);

  // =========================
  // NAME DOES NOT MATCH
  // =========================

  if (normalizedInputName !== normalizedRecordName) {
    throw new Error("Student name does not match official records");
  }

  // =========================
  // HASH PASSWORD
  // =========================

  const hashedPassword = await bcrypt.hash(password, 10);

  // =========================
  // CREATE USER
  // =========================

  const user = await prisma.user.create({
    data: {
      name,

      studentId,

      password: hashedPassword,

      role: "STUDENT",

      status: "PENDING",

      isFirstLogin: false,
    },
  });

  return user;
};
