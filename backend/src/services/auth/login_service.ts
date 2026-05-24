import prisma from "../../lib/prisma";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

interface LoginData {
  login: string;

  password: string;
}

export const loginService = async ({ login, password }: LoginData) => {
  // =========================
  // FIND USER
  // =========================

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          studentId: login,
        },

        {
          username: login,
        },
      ],
    },
  });

  // =========================
  // USER NOT FOUND
  // =========================

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // =========================
  // CHECK PASSWORD
  // =========================

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // =========================
  // CHECK ACCOUNT STATUS
  // =========================

  if (user.status === "PENDING") {
    throw new Error("Account pending approval");
  }

  if (user.status === "REJECTED") {
    throw new Error("Account rejected");
  }

  // =========================
  // GENERATE TOKEN
  // =========================

  const token = jwt.sign(
    {
      userId: user.id,
    },

    process.env.JWT_SECRET as string,

    {
      expiresIn: "1d",
    },
  );

  return {
    token,

    user: {},
  };
};
