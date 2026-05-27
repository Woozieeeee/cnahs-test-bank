import prisma from "../../lib/prisma";

import bcrypt from "bcryptjs";

interface RegisterData {
  studentId: string;

  password: string;
}

export const registerService = async ({
  studentId,

  password,
}: RegisterData) => {
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
  // BUILD FULL NAME
  // =========================

  const fullName = [
    studentRecord.firstName,

    studentRecord.middleName,

    studentRecord.lastName,

    studentRecord.suffix,
  ]
    .filter(Boolean)
    .join(" ");

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
  // PASSWORD VALIDATION
  // =========================

  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  if (!strongPassword.test(password)) {
    throw new Error("Password does not meet security requirements");
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
      name: fullName,

      studentId,

      password: hashedPassword,

      role: "STUDENT",

      status: "PENDING",

      isFirstLogin: false,
    },
  });

  // =========================
  // ACTIVITY LOG
  // =========================

  await prisma.activityLog.create({
    data: {
      action: "Student Registration",

      categories: ["AUTH"],

      severity: "INFO",

      description: `${fullName} submitted a registration request.`,

      performedBy: fullName,

      targetUser: fullName,
    },
  });

  return user;
};
